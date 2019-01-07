import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import { toggleStarResponse } from '../../../helpers/optimisticResponse';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    skip: props => !props.isStarred,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarResponse(input)
      }),
      ...ownProps
    })
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
    skip: props => props.isStarred,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarResponse(input)
      }),
      ...ownProps
    })
  })
)(Button);