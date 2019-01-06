import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { cancelEvent } from '../../../graphql/mutations';
import { cancelEventResponse } from '../../../helpers/optimisticResponse';

export default graphql(gql(cancelEvent), {
  alias: 'withCancelEventDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      },
      optimisticResponse: cancelEventResponse(input)
    }),
    ...ownProps
  })
})(Dialog);