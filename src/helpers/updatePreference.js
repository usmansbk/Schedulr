import gql from 'graphql-tag';
import client from 'config/client';
import stores from 'stores';
import { updatePreference } from 'api/mutations';

async function updateUserPushToken(device, token) {
  try {
    await client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input: {
          id: stores.appState.userId,
          [device]: token
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function toggleDisablePush(status) {
  try {
    const result = await client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input: {
          id: stores.appState.userId,
          disablePush: status
        }
      }
    });
    const pref = result.data && result.data.updateUserPreference;
    return pref;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export {
  updateUserPushToken,
  toggleDisablePush
};