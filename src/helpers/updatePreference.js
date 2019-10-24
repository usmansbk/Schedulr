import gql from 'graphql-tag';
import Analytics from '@aws-amplify/analytics';
import client from 'config/client';
import stores from 'stores';
import { updatePreference } from 'api/mutations';

function getChannelType(device) {
  switch(device) {
    case 'iosToken': return 'APNS';
    case 'androidToken': return 'GCM';
  }
}

async function updateUserPushToken(device, token) {
  const channelType = getChannelType(device);
  console.log(token, channelType);
  // Analytics.updateEndpoint({
  //   userId: stores.appState.userId,
  //   address: token,
  //   optOut: 'NONE',
  //   channelType
  // }).then(console.log).catch(console.log);
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