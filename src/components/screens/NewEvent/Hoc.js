import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { createEvent } from 'api/mutations';
import { getEvent } from 'api/queries';
// import { createEventResponse } from 'helpers/optimisticResponse';

const alias =  'withNewEventContainer';

export default inject("stores")(observer(
  compose(
    graphql(gql(getEvent), {
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
        event: data && data.getEvent,
        isNew: ownProps.navigation.getParam('isNew'),
        scheduleId: ownProps.navigation.getParam('scheduleId'),
        ...ownProps
      }),
      skip: props => {
        const id = props.navigation.getParam('id');
        return !id;
      }
    }),
    graphql(gql(createEvent), {
      alias,
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input
          },
          // optimisticResponse: () => createEventResponse(input),
          // update: (cache, { data: { createEvent } }) => {
          //   if (createEvent) {
          //     const query = gql(listAllEvents);
          //     const data = cache.readQuery({ query });
          //     data.listAllEvents.items = [
          //       ...data.listAllEvents.items.filter(item => item.id !== createEvent.id),
          //       createEvent
          //     ];
          //     cache.writeQuery({ query, data });
          //   }
          // }
        }),
        ...ownProps
      })
    }),
    //   graphql(gql(listAllSchedules), {
    //     alias,
    //     options: {
    //       fetchPolicy: 'cache-only',
    //     },
    //     props: ({ data, ownProps }) => {
    //       const id = ownProps.navigation.getParam('scheduleId');
    //       return ({
    //         schedules: data && data.listAllSchedules && data.listAllSchedules.items,
    //         scheduleId: id,
    //         ...ownProps
    //       });
    //     }
      // })
    )(Screen)
));