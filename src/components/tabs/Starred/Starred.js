import React from 'react';
import List from 'components/lists/StarredEvents';

export default class Starred extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return (nextProps.navigation.isFocused &&
      (
        nextProps.events.length !== this.props.events.length ||
        nextProps.loading !== this.props.loading
      )
    );
  };
  
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
