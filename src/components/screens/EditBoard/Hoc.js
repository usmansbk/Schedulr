import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { updateSchedule } from 'mygraphql/mutations';
import { getSchedule } from 'mygraphql/queries';
import { updateScheduleResponse } from 'helpers/optimisticResponse';

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
      board: data && data.getSchedule,
      ...ownProps
    })
  }),
  graphql(gql(updateSchedule), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => updateScheduleResponse(input)
      }),
      ...ownProps,
    })
  })
)(Screen);