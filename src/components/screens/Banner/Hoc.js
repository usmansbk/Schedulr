import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getEvent } from 'api/queries';
import { updateEvent } from 'api/mutations';
import Screen from './Screen';

const alias = 'withBanner';

export default compose(
  graphql(gql(getEvent), {
    alias,
    options: props => ({
      variables: {
        id: props.navigation.getParam('id'),
      },
      fetchPolicy: 'cache-only',
    }),
    props: ({ data, ownProps }) => ({
      event: data && data.getEvent,
      ...ownProps,
    }),
  }),
  graphql(gql(updateEvent), {
    alias,
    props: ({ mutate, ownProps }) => ({
      uploadPhoto: (input) => mutate({
        variables: {
          input
        }
      }),
      ...ownProps
    })
  })
)(Screen)