import gql from 'graphql-tag';
import client from '../config/apolloClient';
import SETTINGS from '../graphql/localState/query/Settings';

const COMMUNITY = gql`
  {
    community @client {
      id
      name
      url
      logo
      isProtected
    }
  }
`;

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