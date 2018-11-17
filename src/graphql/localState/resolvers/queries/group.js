import { group } from '../../fragments';

export default {
  group: (_, { id }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Group', id });
    const node = cache.readFragment({ fragment: group, id: fragmentId });
    return node;
  },
}