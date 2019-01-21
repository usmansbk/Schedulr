import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { listEventComments } from '../../../graphql/queries';
import { createComment, deleteComment } from '../../../graphql/mutations';

const alias = 'withCommentsScreen';

export default compose(
  graphql(gql(listEventComments), {
    alias,
    options: props => ({

    }),
    props: ({ data, ownProps }) => ({
      ...ownProps
    })
  }),
  // graphql(gql(createComment), {}),
  // graphql(gql(deleteComment), {}),
)(Screen);