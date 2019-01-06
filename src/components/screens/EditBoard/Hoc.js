import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { updateBoard } from '../../../graphql/mutations';
import { getBoard } from '../../../graphql/queries';
import { updateBoardResponse } from '../../../helpers/optimisticResponse';

const alias = 'withEditBoardContainer';

export default compose(
  graphql(gql(getBoard), {
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
      board: data && data.getBoard,
      ...ownProps
    })
  }),
  graphql(gql(updateBoard), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: updateBoardResponse(input)
      }),
      ...ownProps,
    })
  })
)(Screen);