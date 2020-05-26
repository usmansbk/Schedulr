import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { deleteSchedule } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { DELETE } from 'lib/constants';

export default compose(
  withNavigation,
  graphql(gql(deleteSchedule), {
    alias: 'withDeleteScheduleDialog',
    withRef: true,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { deleteSchedule } }) => (
          updateApolloCache(cache, deleteSchedule, DELETE)
        ),
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'deleteSchedule',
          responseType: 'Schedule',
          operationType: DELETE
        })
      }),
      ...ownProps
    })
  })
)(Dialog);