import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { cancelEvent } from '../../../graphql/mutations';
import { cancelEventResponse } from '../../../helpers/optimisticResponse';

export default graphql(gql(cancelEvent), {
  alias: 'withCancelEventDialog',
  options: {
    onCompleted: () => {
      SimpleToast.show('Event cancelled', SimpleToast.SHORT);
    }
  },
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      },
      optimisticResponse: () => cancelEventResponse(input)
    }),
    ...ownProps
  })
})(Dialog);