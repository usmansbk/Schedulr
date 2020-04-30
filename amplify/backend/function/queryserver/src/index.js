const resolvers = require('./resolvers');

exports.handler = async (event) => {
  const { typeName, fieldName } = event;
  const typeHandler = resolvers[typeName];
  if (typeHandler) {
    const resolver = typeHandler[fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error('Resolver not found');
};
