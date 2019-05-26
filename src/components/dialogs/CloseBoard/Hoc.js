import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { closeBoard } from 'mygraphql/mutations';
import { closeBoardResponse } from 'helpers/optimisticResponse';

export default graphql(gql(closeBoard), {
  alias: 'withCloseBoardDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      optimisticResponse: () => closeBoardResponse(input)
    }),
    ...ownProps
  })
})(Dialog);