import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { deleteEvent } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';

export default compose(
  withNavigation,
  graphql(gql(deleteEvent), {
    alias: 'withDeleteEventDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { deleteEvent } }) => (
          updateApolloCache(cache, deleteEvent, "DELETE")
        ),
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'deleteEvent',
          operationType: 'DELETE',
          responseType: 'Event'
        })
      }),
      ...ownProps
    })
  })
)(Dialog);