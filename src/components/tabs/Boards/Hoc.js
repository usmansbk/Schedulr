import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Boards from './Boards';
import { listAllBoards } from 'mygraphql/queries';
import { listAllBoardsDelta } from 'mygraphql/deltasync';

const alias = 'withBoardsContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(listAllBoards),
    {
      alias,
      options: (props) => {
        const skipBaseQuery = props.stores.boardsSync.skipBaseQuery;
        return {
          fetchPolicy: skipBaseQuery ? 'cache-first' : 'cache-and-network',
          notifyOnNetworkStatusChange: true,
          onCompleted: () => {
            !skipBaseQuery && props.stores.deltaSync.updateBaseLastSyncTimestamp();
          },
        };
      },
      props: ({ data, ownProps}) => ({
        loading: data.loading || data.networkStatus === 4,
        boards: data && data.listAllBoards && data.listAllBoards.items || [],
        error: data.error && !data.listAllBoards,
        onRefresh: () => data.refetch(),
        fetchMore: () => data.fetchMore({
          query: gql(listAllBoardsDelta),
          variables: {
            lastSync: ownProps.stores.boardsSync.lastSync
          },
          updateQuery: (prev, { fetchMoreResult: { listAllBoardsDelta }}) => {
            alert(JSON.stringify(listAllBoardsDelta));
          }
        }),
        ...ownProps
      })
    })
  )(Boards)
));