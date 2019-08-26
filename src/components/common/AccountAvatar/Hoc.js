import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { me } from 'api/queries';
import Avatar from './Avatar';

export default inject("stores")(observer(
  graphql(
    gql(me),
    {
      options: props => ({
        variables: {
          id: props.stores.appState.userId
        },
        fetchPolicy: 'cache-only'
      }),
      props: ({ data: { me={} }, ownProps }) => ({
        name: me.name,
        email: me.email,
        pictureUrl: me.pictureUrl,
        avatar: me.avatar,
        ...ownProps
      })
    }
  )(Avatar)
));