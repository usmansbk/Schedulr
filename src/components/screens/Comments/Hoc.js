import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUser } from 'api/queries';
import Screen from './Screen';
import { createComment } from 'api/mutations';
// import { createCommentResponse } from 'helpers/optimisticResponse';
// import { COMMENTS_LIMIT } from 'lib/constants';

const alias = 'withCommentsScreen';

// const LIMIT = COMMENTS_LIMIT;

export default inject("stores")(observer(
  compose(
    graphql(gql(getUser), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-only',
        variables: {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps }) => ({
        user: data && data.getUser,
        ...ownProps
      })
    })
  )(Screen)
));