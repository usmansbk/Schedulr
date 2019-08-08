import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUser } from 'mygraphql/queries';
import Avatar from './Avatar';

export default inject("stores")(observer(
  graphql(
    gql(getUser),
    {
      options: props => ({
        variables: {
          email: props.stores.appState.userId
        },
        fetchPolicy: 'cache-only'
      }),
      props: ({ data: { getUser={} }, ownProps }) => ({
        name: getUser.name,
        email: getUser.email,
        pictureUrl: getUser.pictureUrl,
        ...ownProps
      })
    }
  )(Avatar)
));