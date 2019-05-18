import React from 'react';
import List from 'components/lists/StarredEvents';

export default class Starred extends React.Component {

  // shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  
  render() {
    const {
      navigation,
      loading,
      events,
      onRefresh
    } = this.props;

    return (
      <List
        starred
        navigation={navigation}
        loading={loading}
        events={events}
        onRefresh={onRefresh}
      />
    );
  }
}
