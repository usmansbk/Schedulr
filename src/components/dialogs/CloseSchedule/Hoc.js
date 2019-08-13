import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { updateSchedule } from 'api/mutations';
// import { closeScheduleResponse } from 'helpers/optimisticResponse';

export default graphql(gql(updateSchedule), {
  alias: 'withCloseScheduleDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      // optimisticResponse: () => closeScheduleResponse(input)
    }),
    ...ownProps
  })
})(Dialog);