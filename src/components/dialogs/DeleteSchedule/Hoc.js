import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { deleteSchedule } from 'api/mutations';

export default compose(
  withNavigation,
  graphql(gql(deleteSchedule), {
    alias: 'withDeleteScheduleDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
      }),
      ...ownProps
    })
  })
)(Dialog);