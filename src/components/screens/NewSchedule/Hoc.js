import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createSchedule } from 'mygraphql/mutations';
import { listAllSchedules } from 'mygraphql/queries';
import { createScheduleResponse } from 'helpers/optimisticResponse';

const alias =  'withNewScheduleContainer';

export default graphql(gql(createSchedule), {
  alias,
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      },
      optimisticResponse: () => createScheduleResponse(input),
      update: (cache, { data: { createSchedule } }) => {
        if (createSchedule) {
          const query = gql(listAllSchedules);
          const data = cache.readQuery({ query });
          data.listAllSchedules.items = [
            ...data.listAllSchedules.items.filter(item => item.id !== createSchedule.id),
            createSchedule
          ];
          cache.writeQuery({ query, data });
        }
      }
    }),
    ...ownProps
  })
})(Screen);