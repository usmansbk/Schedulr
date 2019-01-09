import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import { toggleStarButton } from '../../../helpers/optimisticResponse';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    options: {},
    props: ({ mutate, ownProps }) => ({
      onStarEvent: async (input, prev) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'starEvent')
      }),
      ...ownProps
    }),
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
    props: ({ mutate, ownProps }) => ({
      onUnstarEvent: async (input, prev) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'unstarEvent')
      }),
      ...ownProps
    }),
  })
)(Button);