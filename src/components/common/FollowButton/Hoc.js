import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import uniqWith from 'lodash.uniqwith';
import Button from './Button';
import { followSchedule, unfollowSchedule } from 'mygraphql/mutations';
import { listAllSchedules, listAllEvents, listScheduleEvents } from 'mygraphql/queries';
import { filterEvents } from 'mygraphql/filter';
import {
  followScheduleResponse,
  unfollowScheduleResponse
} from 'helpers/optimisticResponse';
import client from 'config/client';

const _filter = (a, b) => a.id === b.id;

export default compose(
  graphql(gql(followSchedule), {
    alias: 'withFollowSchedule',
    props: ({ mutate, ownProps }) => ({
      onFollowSchedule: () => mutate({
        variables: {
          input: {
            id: ownProps.id
          }
        },
        update: (cache, { data: { followSchedule } }) => {
          if (followSchedule) {
            const query = gql(listAllSchedules);
            const data = cache.readQuery({ query });
            data.listAllSchedules.items = [
              ...data.listAllSchedules.items.filter(item => item.id !== followSchedule.id),
              followSchedule
            ];
            cache.writeQuery({ query, data });

            client.query({
              query: gql(listScheduleEvents),
              variables: {
                id: followSchedule.id,
                filter: filterEvents
              }
            }).then(({ data }) => {
              const items = data && data.listScheduleEvents &&
                data.listScheduleEvents.events &&
                data.listScheduleEvents.events.items || [];
              const allEventsQuery = gql(listAllEvents);
              const allEventsData = cache.readQuery({ query: allEventsQuery });
              allEventsData.listAllEvents.items = uniqWith([...allEventsData.listAllEvents.items, ...items], _filter);
              cache.writeQuery({
                query: gql(listAllEvents),
                data: allEventsData
              });
            });
          }
        },
        optimisticResponse: () => followScheduleResponse(ownProps.id),
      }),
      ...ownProps
    })
  }),
  graphql(gql(unfollowSchedule), {
    alias: 'withUnfollowSchedule',
    props: ({ mutate, ownProps }) => ({
      onUnfollowSchedule: async () => await mutate({
        variables: {
          input: {
            id: ownProps.id
          },
        },
        update: (cache, { data: { unfollowSchedule } }) => {
          if (unfollowSchedule) {
            const query = gql(listAllSchedules);
            const data = cache.readQuery({ query });
            data.listAllSchedules.items = data.listAllSchedules.items.filter(item => item.id !== unfollowSchedule.id);
            cache.writeQuery({ query, data });

            const allEventsQuery = gql(listAllEvents);
            const allEventsData = cache.readQuery({ query: allEventsQuery });
            allEventsData.listAllEvents.items = allEventsData.listAllEvents.items.filter(item => (
              (item.schedule === null) || (item.schedule.id !== unfollowSchedule.id) || item.isBookmarked
            ));
            cache.writeQuery({ query: allEventsQuery, data: allEventsData });
          }
        },
        optimisticResponse: () => unfollowScheduleResponse(ownProps.id),
      }),
      ...ownProps
    })
  }),
)(Button);