import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { updateEvent, deleteEvent } from 'api/mutations';
import { getEvent } from 'api/queries';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { UPDATE, DELETE } from 'lib/constants';

export default compose(
  withNavigation,
  graphql(gql(deleteEvent), {
    alias: 'withDeleteEventDialog',
    withRef: true,
    props: ({ mutate, ownProps }) => ({
      deleteEvent: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { deleteEvent } }) => (
          updateApolloCache(cache, deleteEvent, DELETE)
        ),
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'deleteEvent',
          operationType: DELETE,
          responseType: 'Event'
        })
      }),
      ...ownProps
    })
  }),
  graphql(gql(updateEvent), {
    alias: 'withCancelEventDialog',
    withRef: true,
    props: ({ mutate, ownProps }) => ({
      cancelEvent: (input) => mutate({
        variables: {
          input
        },
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'updateEvent',
          operationType: UPDATE,
          responseType: 'Event'
        })
      }),
      ...ownProps
    })
  }),
  graphql(gql(getEvent), {
    withRef: true,
    options: props => ({
      fetchPolicy: 'cache-only',
      variables : {
        id: props.id,
      }
    }),
    props: ({ data, ownProps }) => ({
      banner: data.getEvent.banner,
      cancelledDates: data.getEvent.cancelledDates || [],
      ...ownProps,
    })
  })
)(Dialog);