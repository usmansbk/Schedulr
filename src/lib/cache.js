import client from '../config/apolloClient';
import SETTINGS from '../graphql/localState/query/Settings';
import COMMUNITY from '../graphql/localState/query/Community';

export const setCommunity = (community) => {
  client.writeData({
    data: {
      community
    }
  });
};

export const getCommunity = () => {
  const data = client.readQuery({ query: COMMUNITY });
  const { community } = data;
  return community || {};
};

export const getSettings = () => {
  const defaultSettings = client.readQuery({ query: SETTINGS });
  const { settings: { reminder: { endReminder, sound, vibrate, before } } } = defaultSettings;

  const options = {
    sound,
    vibrate,
    endReminder
  };
  return ({
    options,
    before
  });
}