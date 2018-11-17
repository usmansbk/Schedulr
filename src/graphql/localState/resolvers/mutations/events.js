import moment from 'moment';
import { createNewEvent } from '../../../../lib/utils';
import EVENTS from '../../query/AllEvents';
import ME from '../../query/UserInfo';
import {
  toggleStar,
  cancelEvent,
  editEvent,
  group
} from '../../fragments';

export default {
  createEvent: (_, { input: { event } }, { cache, getCacheKey }) => {
    const { events } = cache.readQuery({ query: EVENTS });
    const groupFragmentId = getCacheKey({ __typename: 'Group', id: event.groupId });
    const groupNode = cache.readFragment({ fragment: group, id: groupFragmentId });
    const { me } = cache.readQuery({ query: ME });
    const node = createNewEvent(event, me, groupNode);
    const edge = {
      __typename: 'EventEdge',
      cursor: node.id,
      node,
    };
    const newList = Object.assign({}, events, {
      edges: [edge, ...events.edges]
    });
    cache.writeQuery({
      query: EVENTS,
      data: {
        events: newList
      }
    });
    return node;
  },
  editEvent: (_, { input: { event, id } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const fragment = editEvent;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      name: event.name,
      description: event.description,
      eventType: event.eventType,
      location: event.location,
      start: event.start,
      end: event.end,
      repeat: event.repeat,
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  },
  deleteEvent: (_, { input: { id } }, { cache }) => {
    const { events } = cache.readQuery({ query: EVENTS });
    const { edges } = events;
    const targetIndex = edges.findIndex(edge => edge.node.id === id);
    if (targetIndex !== -1) {
      const updated = edges.slice(0, targetIndex).concat(
        edges.slice(targetIndex + 1)
      );
      const newList = Object.assign({}, events, {
        edges: updated
      });
      cache.writeQuery({
        query: EVENTS,
        data: {
          events: newList
        }
      });
    }
    return id;
  },
  cancelEvent: (_, { input: { id } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const fragment = cancelEvent;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      isCancelled: true,
      updatedAt: moment().toISOString()
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  },
  starEvent: (_, { input: { id } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const fragment = toggleStar;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      isStarred: !node.isStarred,
      updatedAt: moment().toISOString()
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  },
};
