import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { openBoard } from 'mygraphql/mutations';
import { openBoardResponse } from 'helpers/optimisticResponse';

export default graphql(gql(openBoard), {
  alias: 'withOpenBoardDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      },
      optimisticResponse: () => openBoardResponse(input)
    }),
    ...ownProps
  })
})(Dialog);