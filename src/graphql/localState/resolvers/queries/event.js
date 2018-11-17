import fragment from '../../fragments/event';

export default {
  event: (_, { id }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Event', id });
    const node = cache.readFragment({ fragment, id: fragmentId });
    return node;
  }
}