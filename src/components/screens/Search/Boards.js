import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import uniqWith from 'lodash.uniqwith';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/BoardSearch';
import { listAllBoards, searchBoard } from 'mygraphql/queries';
import { SEARCH_PAGE_SIZE, SEARCH_DISTANCE } from 'lib/constants';

@inject('stores')
@observer
export default class Boards extends React.Component {

  componentWillUnmount = () => this.props.stores.appState.onChangeText('');

  render() {
    const { stores } = this.props;

    const { query, isConnected, location } = stores.appState;

    return (
      <ListHoc
        query={query}
        isConnected={isConnected}
        location={location.lat ? location : null}
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(listAllBoards), {
    alias: 'withSearchBoardsOffline',
    skip: props => props.isConnected,
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      boards: data && data.listAllBoards && data.listAllBoards.items.filter(
        item => item.name.toLowerCase().includes(ownProps.query.toLowerCase())
      ),
      ...ownProps
    })
  }),
  graphql(gql(searchBoard), {
    alias: 'withSearchBoardsOnline',
    skip: props => !props.isConnected || !props.query,
    options: props => ({
      fetchPolicy: 'no-cache',
      variables: {
        filter: {
          query: props.query,
          location: props.location,
          distance: SEARCH_DISTANCE
        },
        size: SEARCH_PAGE_SIZE
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      boards: data && data.searchBoard && data.searchBoard.items,
      from: data && data.searchBoard && data.searchBoard.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (from, size=SEARCH_PAGE_SIZE) => data.fetchMore({
        variables: {
          filter: {
            query: ownProps.query,
            location: ownProps.location,
            distance: '150km'
          },
          from,
          size
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const moreBoards = fetchMoreResult.searchBoard && fetchMoreResult.searchBoard.items;
            return Object.assign({}, previousResult, {
              searchBoard: Object.assign({}, previousResult.searchBoard,  {
                nextToken: fetchMoreResult.searchBoard.nextToken,
                items: uniqWith([
                  ...previousResult.searchBoard.items,
                  ...moreBoards
                ], (a, b) => a.id === b.id)
              })
            });
          }
          return previousResult;
        }
      }),
      ...ownProps
    })
  })
)(List);