import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { updateSchedule } from 'api/mutations';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { UPDATE } from 'lib/constants';

export default graphql(gql(updateSchedule), {
  alias: 'withOpenScheduleDialog',
  withRef: true,
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      optimisticResponse: buildOptimisticResponse({
        input,
        mutationName: 'updateSchedule',
        operationType: UPDATE,
        responseType: 'Schedule'
      })
    }),
    ...ownProps
  })
})(Dialog);