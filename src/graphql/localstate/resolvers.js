import gql from 'graphql-tag';
import { userOptions, remindMeBefore as reminders } from '../queries';

export default {
  Mutation: {
    toggleOption: (_, { id }, { cache }) => {
      const query = gql(userOptions);
      const { options } = cache.readQuery({ query });
      options[id] = !options[id];
      cache.writeQuery({
        query,
        data: {
          options
        }
      });
      return options;
    },
    toggleRemindMeBefore: (_, { id }, { cache }) => {
      const query = gql(reminders);
      const { remindMeBefore } = cache.readQuery({ query });
      remindMeBefore[id] = !remindMeBefore[id];
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