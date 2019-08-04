import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { closeSchedule } from 'mygraphql/mutations';
import { closeScheduleResponse } from 'helpers/optimisticResponse';

export default graphql(gql(closeSchedule), {
  alias: 'withCloseScheduleDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      optimisticResponse: () => closeScheduleResponse(input)
    }),
    ...ownProps
  })
})(Dialog);