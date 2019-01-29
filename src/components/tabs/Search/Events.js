import React from 'react';
import List from '../../lists/EventSearch';
import Fab from '../../common/Fab';

export default class Events extends React.PureComponent {
  render() {
    // alert(this.props.screenProps.query);
    return (
      <React.Fragment>
        <List />
        <Fab
          small
          icon="filter-list"
          onPress={() => null}
        />
      </React.Fragment>
    );
  }
}
