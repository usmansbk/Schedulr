import gql from 'graphql-tag';
import { userOptions, remindMeBefore as reminders } from '../queries';

export default {
  Mutation: {
    toggleOption: (_, { key }, { cache }) => {
      const query = gql(userOptions);
      const { options } = cache.readQuery({ query });
      options[key] = !options[key];
      cache.writeQuery({
        query,
        data: {
          options
        }
      });
      return options;
    },
    toggleRemindMeBefore: (_, { key }, { cache }) => {
      const query = gql(reminders);
      const { remindMeBefore } = cache.readQuery({ query });
      remindMeBefore[key] = !remindMeBefore[key];
      cache.writeQuery({
        query,
        data: {
          remindMeBefore
        }
      });
      return remindMeBefore;
    }
  }
}