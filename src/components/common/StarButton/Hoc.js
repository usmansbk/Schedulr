import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import { unstarResponse, starResponse } from '../../../helpers/optimisticResponse';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    options: {},
    props: ({ mutate, ownProps }) => ({
      onStarEvent: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => starResponse(input)
      }),
      ...ownProps
    }),
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
    props: ({ mutate, ownProps }) => ({
      onUnstarEvent: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => unstarResponse(input)
      }),
      ...ownProps
    }),
  })
)(Button);