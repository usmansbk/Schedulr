import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { openSchedule } from 'mygraphql/mutations';
import { openScheduleResponse } from 'helpers/optimisticResponse';

export default graphql(gql(openSchedule), {
  alias: 'withOpenScheduleDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      optimisticResponse: () => openScheduleResponse(input)
    }),
    ...ownProps
  })
})(Dialog);