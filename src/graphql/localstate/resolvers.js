import gql from 'graphql-tag';
import { Settings, RemindMeBefore } from '../queries';

const resolvers = {
  Mutation: {
    toggleSettings: (_, { key }, { cache }) => {
      const query = gql(Settings);
      const { settings } = cache.readQuery({ query });
      settings[key] = !settings[key];
      cache.writeQuery({
        query,
        data: {
          settings
        }
      });
      return null;
    },
    toggleRemindMeBefore: (_, { key }, { cache }) => {
      const query = gql(RemindMeBefore);
      const { remindMeBefore } = cache.readQuery({ query });
      remindMeBefore[key] = !remindMeBefore[key];
      cache.writeQuery({
        query,
        data: {
          remindMeBefore
        }
      });
      return null;
    }
  }
};

export default resolvers;