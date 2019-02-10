import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import Button from './Button';
import { followBoard, unfollowBoard } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';

export default compose(
  graphql(gql(followBoard), {
    alias: 'withFollowBoard',
    options: props => ({
      variables: {
        input: {
          id: props.id
        }
      },
      update: (cache, { data: { followBoard } }) => {
        if (followBoard) {
          const query = gql(listAllBoards);
          const data = cache.readQuery({ query });
          data.listAllBoards.items = [
            ...data.listAllBoards.items.filter(item => item.id !== followBoard.id),
            followBoard
          ];
          cache.writeQuery({ query, data });
        }
      }
    }),
    props: ({ mutate, ownProps }) => ({
      onFollowBoard: async () => await mutate(),
      ...ownProps
    })
  }),
  graphql(gql(unfollowBoard), {
    alias: 'withUnfollowBoard',
    options: props => ({
      variables: {
        input: {
          id: props.id
        },
      },
      update: (cache, { data: { unfollowBoard } }) => {
        if (unfollowBoard) {
          const query = gql(listAllBoards);
          const data = cache.readQuery({ query });
          data.listAllBoards.items = data.listAllBoards.items.filter(item => item.id !== unfollowBoard.id);
          cache.writeQuery({ query, data });
        }
      }
    }),
    props: ({ mutate, ownProps }) => ({
      onUnfollowBoard: async () => await mutate(),
      ...ownProps
    })
  }),
  withNavigation
)(Button);