import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { updateSchedule } from 'api/mutations';
// import { openScheduleResponse } from 'helpers/optimisticResponse';

export default graphql(gql(updateSchedule), {
  alias: 'withOpenScheduleDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      // optimisticResponse: () => openScheduleResponse(input)
    }),
    ...ownProps
  })
})(Dialog);