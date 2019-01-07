import gql from 'graphql-tag';
import { userOptions } from '../queries';

export default {
  Mutation: {
    toggleOption: (_, { id }, { cache }) => {
      const query = gql(userOptions);
      const { options } = cache.readQuery({
        query
      });
      options[id] = !options[id];
      cache.writeQuery({
        query,
        data: {
          options
        }
      });
      return options;
    }
  }
}