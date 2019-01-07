import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import {} from '../../../helpers/optimisticResponse';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    skip: props => !props.isStarred,
    options: props => ({
      variables: {
        input: {
          id: props.id
        }
      }
    }),
    props: ({ mutate, ownProps }) => ({
      onSubmit: async () => await mutate(),
      ...ownProps
    })
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
    skip: props => props.isStarred,
    options: props => ({
      variables: {
        input: {
          id: props.id
        }
      }
    }),
    props: ({ mutate, ownProps }) => ({
      onSubmit: async () => await mutate(),
      ...ownProps
    })
  })
)(Button);