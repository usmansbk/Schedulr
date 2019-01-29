import React from 'react';
import List from '../../lists/EventSearch';
import Fab from '../../common/Fab';

export default class Events extends React.PureComponent {
  render() {
    const { isConnected, query } = this.props.screenProps;
    return (
      <React.Fragment>
        <List
          isConnected={isConnected}
        />
        {
          isConnected && (
            <Fab
              small
              icon="filter-list"
              onPress={() => null}
            />
          )
        }
      </React.Fragment>
    );
  }
}
