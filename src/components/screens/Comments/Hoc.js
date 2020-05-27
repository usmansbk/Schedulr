import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getEventComments } from 'api/queries';
import Container from './Container';
import { PAGINATION_LIMIT } from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

export default inject("stores")(observer(
  graphql(gql(getEventComments), {
    alias: 'withGetEventCommentsScreenContainer',
    options: props => ({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.navigation.getParam('id'),
        limit: PAGINATION_LIMIT
      },
    }),
    props: ({ data, ownProps }) => ({
      loading: data && (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
      notFound: !(data && data.getEventComments) && !data.error,
      error: data && data.error,
      onRefresh: () => data.refetch({
        nextToken: null
      }),
      fetchMore: (nextToken) => data.fetchMore({
        variables: {
          nextToken
        },
        updateQuery: (prev, { fetchMoreResult }) => (
          updateQuery({
            prev,
            fetchMoreResult,
            rootField: 'getEventComments',
            connectionField: 'comments'
          })
        )
      }),
      isOwner: data && data.getEventComments&& data.getEventComments.isOwner,
      commentEventId: ownProps.navigation.getParam('id'),
      commentScheduleId: data && data.getEventComments && data.getEventComments.schedule && data.getEventComments.schedule.id,
      commentsCount: data && data.getEventComments && data.getEventComments.commentsCount,
      comments: (data && data.getEventComments && data.getEventComments.comments && data.getEventComments.comments.items) || [],
      nextToken: data && data.getEventComments && data.getEventComments.comments && data.getEventComments.comments.nextToken,
      ...ownProps
    })
  })(Container)
));