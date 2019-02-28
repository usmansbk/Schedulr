import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { closeBoard } from '../../../graphql/mutations';
import { closeBoardResponse } from '../../../helpers/optimisticResponse';

export default graphql(gql(closeBoard), {
  alias: 'withCloseBoardDialog',
  options: {
    onCompleted: () => {
      SimpleToast.show('Board closed', SimpleToast.SHORT);
    }
  },
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      },
      optimisticResponse: () => closeBoardResponse(input)
    }),
    ...ownProps
  })
})(Dialog);