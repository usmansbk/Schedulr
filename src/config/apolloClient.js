import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  split,
  Observable
} from 'apollo-boost';
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';
import { WebSocketLink } from 'apollo-link-ws';
import { withClientState } from 'apollo-link-state';
import { getMainDefinition } from 'apollo-utilities';
import { persistCache } from 'apollo-cache-persist';
import { createUploadLink } from 'apollo-upload-client';
import defaults from '../graphql/localState/defaults';
import resolvers from '../graphql/localState/resolvers';

const uri = `${Config.PROTOCOL}${Config.DOMAIN}/graphql`;
const wsUri = `ws://${Config.DOMAIN}/subscriptions`;
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      event: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Event', id: args.id }),
      group: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Group', id: args.id }),
    }
  }
});

persistCache({
  cache,
  storage: AsyncStorage,
});

const stateLink = withClientState({
  cache,
  defaults,
  resolvers
});

const httpLink = new createUploadLink({ uri });
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: AsyncStorage.getItem('token')
    }
  }
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      Authorization: token
    }
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const httpLinkWithMiddleware = ApolloLink.from([
  stateLink,
  requestLink,
  httpLink
]);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware,
);

const client = new ApolloClient({
  link,
  cache,
});

client.onResetStore(stateLink.writeDefaults);

export default client;