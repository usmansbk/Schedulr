import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import Button from './Button';
import { followBoard, unfollowBoard } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';

export default compose(
  graphql(gql(followBoard), {
    alias: 'withFollowBoard'
  }),
  graphql(gql(unfollowBoard), {
    alias: 'withUnfollowBoard'
  }),
  withNavigation
)(Button);