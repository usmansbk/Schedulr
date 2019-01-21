import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { Settings } from '../../../graphql/queries';
import { ToggleSettings } from '../../../graphql/mutations';

export default compose(
  graphql(gql(Settings), {
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      settings: data && data.settings || undefined,
      ...ownProps
    })
  }),
  graphql(gql(ToggleSettings), {
    props: ({ mutate, ownProps }) => ({
      toggleSettings: async (key) => await mutate({
        variables: {
          key
        }
      }),
      ...ownProps
    })
  })
)(Screen);