import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { getEvent } from '../../../graphql/queries';
import { updateEvent } from '../../../graphql/mutations';

export default compose(
  graphql(gql(getEvent), {
    alias: 'EditEventContainer',
    options: props => {
      const id = props.navigation.getParam('id');
      return ({
        variables: {
          id
        },
        fetchPolicy: 'cache-only'
      });
    },
    props: ({ data, ownProps }) => ({
      event: data && data.getEvent,
      error: data.error,
      ...ownProps
    })
  }),
  graphql(gql(updateEvent), {
    alias: 'EditEventContainer',
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (form) => await mutate({
        variables: {
          input: {
            id: ownProps.navigation.getParam('id'),
            ...form
          }
        }
      }),
      ...ownProps,
    })
  })
)(Screen);