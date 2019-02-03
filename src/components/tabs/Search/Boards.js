import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/BoardSearch';

export default class Boards extends React.PureComponent {

  render() {
    const {
      loading,
      boards,
    } = this.props;
    return (
      <List
        bestMatch
        boards={boards}
        loading={loading}
      />
    );
  }
}