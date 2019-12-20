import gql from 'graphql-tag';
import client from 'config/client';
import stores from 'stores';
import { updatePreference } from 'api/mutations';
import logger from 'config/logger';

async function updateUserPushToken({ userId }) {
  try {
    await client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input: {
          id: stores.appState.userId,
          userId 
        }
      }
    });
  } catch (error) {
    logger.logError(error);
  }
}
function updateUserPreference(optimisticResponse) {
  try {
    let input = Object.assign({}, optimisticResponse);
    delete input.__typename;
    client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUserPreference: optimisticResponse
      }
    });
    return optimisticResponse;
  } catch (error) {
    logger.logError(error);
  }
  return null;
}

export {
  updateUserPushToken,
  updateUserPreference
};