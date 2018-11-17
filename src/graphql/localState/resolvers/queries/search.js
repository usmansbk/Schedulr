import EVENTS from '../../query/AllEvents';
import GROUPS from '../../query/Groups';

export default {
  search: (_, { input: { name, type } }, { cache }) => {
    if (type === 'event') {
      const { events: { edges } } = cache.readQuery({ query: EVENTS });
      const found = edges.filter(({ node }) => node.name.toLowerCase().trim().includes(name.toLowerCase()));
      return {
        __typename: 'Search',
        events: {
          __typename: 'EventConnection',
          edges: found
        }
      }
    } else {
      const { groups: { edges } } = cache.readQuery({ query: GROUPS });
      const found = edges.filter(({ node }) => node.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
      return {
        __typename: 'Search',
        groups: {
          __typename: 'GroupConnection',
          edges: found
        }
      }
    }
  },
}