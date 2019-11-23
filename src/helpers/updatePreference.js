import gql from 'graphql-tag';
import client from 'config/client';
import stores from 'stores';
import { updatePreference } from 'api/mutations';

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
    console.log(error);
  }
}
async function updateUserPreference(optimisticResponse) {
  try {
    let input = optimisticResponse;
    delete input.__typename;
    const result = await client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input
      }
    });
    return result.data.updateUserPreference;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export {
  updateUserPushToken,
  updateUserPreference
};