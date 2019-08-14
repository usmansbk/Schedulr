import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { getProfile } from 'api/queries';
import { updateUser } from 'api/mutations';

const alias = 'withEditProfileContainer';

export default inject('stores')(observer(
  compose(
    graphql(gql(getProfile), {
      alias,
      options: props => {
        const id = props.stores.appState.userId;
        return ({
          variables: {
            id
          },
          fetchPolicy: 'cache-only'
        });
      },
      props: ({ data, ownProps }) => ({
        user: data && data.getProfile,
        ...ownProps
      })
    }),
    graphql(gql(updateUser), {
      alias,
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input
          },
          // optimisticResponse: () => updateEventResponse(input)
        }),
        ...ownProps,
      })
    })
  )(Screen)
));