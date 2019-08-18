import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { updateSchedule } from 'api/mutations';
import { getSchedule } from 'api/queries';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { UPDATE } from 'lib/constants';

const alias = 'withEditScheduleContainer';

export default compose(
  graphql(gql(getSchedule), {
    alias,
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
      schedule: data && data.getSchedule,
      ...ownProps
    })
  }),
  graphql(gql(updateSchedule), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'updateSchedule',
          responseType: 'Schedule',
          operationType: UPDATE
        })
      }),
      ...ownProps,
    })
  })
)(Screen);