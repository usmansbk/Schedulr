import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { RemindMeBefore } from '../../../graphql/queries';
import { ToggleRemindMeBefore } from '../../../graphql/mutations';

export default compose(
  graphql(gql(RemindMeBefore), {
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      remindMeBefore: data && data.remindMeBefore,
      ...ownProps
    })
  }),
  graphql(gql(ToggleRemindMeBefore), {
    props: ({ mutate, ownProps }) => ({
      toggleRemindMe: async (key) => await mutate({
        variables: {
          key
        }
      }),
      ...ownProps
    })
  })
)(Dialog);