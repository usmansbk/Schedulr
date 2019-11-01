import gql from 'graphql-tag';
import client from 'config/client';
import stores from 'stores';
import { updatePreference } from 'api/mutations';

async function updateUserPushToken({ userId }) {
  console.log(userId);
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
async function toggleDisablePush(optimisticResponse) {
  try {
    const result = await client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input: {
          id: stores.appState.userId,
          disablePush: optimisticResponse.disablePush
        }
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
  toggleDisablePush
};