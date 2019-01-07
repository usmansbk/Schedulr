import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { remindMeBefore } from '../../../graphql/queries';
import { toggleRemindMeBefore } from '../../../graphql/mutations';

export default compose(
  graphql(gql(remindMeBefore), {
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      remindMeBefore: data && data.remindMeBefore,
      ...ownProps
    })
  }),
  graphql(gql(toggleRemindMeBefore), {
    props: ({ mutate, ownProps }) => ({
      handleValueChange: async (id) => await mutate({
        variables: {
          id
        }
      }),
      ...ownProps
    })
  })
)(Dialog);