import gql from 'graphql-tag';
import { state } from 'api/queries';
import { createState, setState, updateUser } from 'api/mutations';
import client from 'config/client';
import logger from 'config/logger';

function persistAppState(input) {
  client.query({
    query: gql(state),
    variables: {
      id: input.id
    },
    fetchPolicy: 'cache-first'
  }).then((result) => {
    const { data } = result;
    const hasState = data && data.state;
    if (!hasState) {
      client.mutate({
        mutation: gql(updateUser),
        variables: {
          input: {
            id: input.id,
            userStateId: input.id
          }
        }
      });
    }
    client.mutate({
      mutation: hasState ? gql(setState) : gql(createState),
      variables: {
        input
      }
    });
  }).catch(logger.logError);
};

export default persistAppState;
