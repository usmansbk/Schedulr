import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/EventSearch';

export default class Events extends React.PureComponent {
  render() {
    const {
      loading,
      events
    } = this.props;
    return (
      <List
        bestMatch
        loading={loading}
        events={events}
      />
    );
  }
}
