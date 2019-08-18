import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { getEvent } from 'api/queries';
import { updateEvent } from 'api/mutations';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { UPDATE } from 'lib/constants';

const alias = 'withEditEventContainer';

export default inject('stores')(observer(
  compose(
    graphql(gql(getEvent), {
      alias,
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
        ...ownProps
      })
    }),
    graphql(gql(updateEvent), {
      alias,
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input
          },
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'updateEvent',
            operationType: UPDATE,
            responseType: 'Event',
          })
        }),
        ...ownProps,
      })
    })
  )(Screen)
));