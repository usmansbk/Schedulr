import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Query } from 'react-apollo';
import Comments from '../components/Comments/';
import COMMENTS from '../graphql/query/Comments';
import { FAILED_TO_LOAD_COMMENTS } from '../lib/errorMessages'

const LIMIT = 5;

export default class EventsTab extends Component {

  shouldComponentUpdate = (nextProps) => this.props.id !== nextProps.id;

  updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;
    const { comments } = fetchMoreResult;
    const updated = Object.assign({}, prev, {
      comments: Object.assign({}, prev.comments, {
        edges: [...comments.edges, ...prev.comments.edges],
        pageInfo: Object.assign({}, prev.comments.pageInfo,
          comments.pageInfo
        )
      })
    });
    return updated;
  }

  _handleError = () => ToastAndroid.show(FAILED_TO_LOAD_COMMENTS, ToastAndroid.SHORT);

  render() {
    const {
      id,
    } = this.props;
    return (
      <Query
        fetchPolicy="cache-and-network"
        query={COMMENTS}
        notifyOnNetworkStatusChange
        variables={{
          id,
          last: LIMIT,
        }}
        onError={this._handleError}
      >
        {({ loading, error, data, fetchMore, refetch, networkStatus }) => {
          let commentsList = [];
          let before;
          let hasPreviousPage;
          if (data) {
            const { comments } = data;
            if (comments) {
              const { edges, pageInfo } = comments;
              if (edges) {
                commentsList = edges;
                before = pageInfo.startCursor;
                hasPreviousPage = pageInfo.hasPreviousPage;
              }
            }
          }
          return (
            <Comments
              error={Boolean(error)}
              loading={loading || (networkStatus === 4)}
              hasPreviousPage={hasPreviousPage}
              id={id}
              comments={commentsList}
              onRefresh={() => refetch()}
              fetchPreviousComments={() => {
                fetchMore({
                  variables: {
                    id,
                    last: LIMIT,
                    before
                  },
                  updateQuery: this.updateQuery,
                })
              }}
            />
          )
        }}
      </Query>
    )
  }
}