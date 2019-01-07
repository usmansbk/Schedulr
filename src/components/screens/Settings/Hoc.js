import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { userOptions } from '../../../graphql/queries';

export default graphql(gql(userOptions), {
  options: {
    fetchPolicy: 'cache-only'
  },
  props: ({ data, ownProps }) => ({
    options: data && data.options,
    ...ownProps
  })
})(Screen);