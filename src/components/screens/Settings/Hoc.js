import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { userOptions } from '../../../graphql/queries';
import { toggleOption } from '../../../graphql/mutations';

export default compose(
  graphql(gql(userOptions), {
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      options: data && data.options,
      ...ownProps
    })
  }),
  graphql(gql(toggleOption), {
    props: ({ mutate, ownProps }) => ({
      toggleOption: async (id) => await mutate({
        variables: {
          id
        }
      }),
      ...ownProps
    })
  })
)(Screen);