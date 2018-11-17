import EVENTS from '../../query/AllEvents';

export default deleteGroupEvents = (cache, id) => {
  const { events } = cache.readQuery({ query: EVENTS });
  const eventEdges = events.edges.filter(({ node }) => node.group.id !== id);
  const eventsList = Object.assign({}, events, {
    edges: eventEdges
  });
  cache.writeQuery({
    query: EVENTS,
    data: {
      events: eventsList
    }
  });
}
