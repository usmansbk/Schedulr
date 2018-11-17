import gql from 'graphql-tag';

export default {
  addToCalendar: (_, { id, calendarId }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const fragment = gql`
      fragment addToCalendar on Event {
        calendarId
      }
    `;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      calendarId
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return null;
  },
  removeFromCalendar: (_, { id }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const fragment = gql`
      fragment removeFromCalendar on Event {
        calendarId
      }
    `;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      calendarId: null
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return null;
  }
}