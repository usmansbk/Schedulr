import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { createEvent } from 'api/mutations';
import { getEvent } from 'api/queries';
import updateApolloCache from 'helpers/updateApolloCache';

export default inject("stores")(observer(
  compose(
    graphql(gql(getEvent), {
      alias: 'withNewEventContainer',
      options: props => {
        const id = props.navigation.getParam('id');
        return ({
          variables: {
            id
          },
          fetchPolicy: 'cache-only'
        });
      },
      props: ({ data, ownProps }) => ({
        event: data && data.getEvent,
        isNew: ownProps.navigation.getParam('isNew'),
        ...ownProps
      }),
      skip: props => {
        const id = props.navigation.getParam('id');
        return !id;
      }
    }),
    graphql(gql(createEvent), {
      alias: 'withCreateEventScreen',
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { createEvent } }) => (
            updateApolloCache(cache, createEvent, "ADD")
          ),
        }),
        ...ownProps
      })
    })
  )(Screen)
));