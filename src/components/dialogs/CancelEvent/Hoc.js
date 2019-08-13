import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { updateEvent } from 'api/mutations';
import { getEvent } from 'api/queries';
// import { cancelEventResponse } from 'helpers/optimisticResponse';

export default compose(
  graphql(gql(updateEvent), {
    alias: 'withCancelEventDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        // optimisticResponse: () => cancelEventResponse(input)
      }),
      ...ownProps
    })
  }),
  graphql(gql(getEvent), {
    options: props => ({
      fetchPolicy: 'cache-only',
      variables : {
        id: props.id,
      }
    }),
    props: ({ data, ownProps }) => ({
      cancelledDates: data.getEvent.cancelledDates || [],
      ...ownProps,
    })
  })
)(Dialog);