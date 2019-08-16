import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getSchedule } from 'api/queries';
import { updateSchedule } from 'api/mutations';
import Screen from './Screen';

const alias = 'withSchedulePictureViewer';

export default compose(
  graphql(gql(getSchedule), {
    alias,
    options: props => ({
      variables: {
        id: props.navigation.getParam('id'),
      },
      fetchPolicy: 'cache-only',
    }),
    props: ({ data, ownProps }) => ({
      schedule: data && data.getSchedule,
      ...ownProps,
    }),
  }),
  graphql(gql(updateSchedule), {
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