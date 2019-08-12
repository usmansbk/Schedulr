import React from 'react';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return nextProps.navigation.isFocused();
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
        navigation={navigation}
        loading={loading}
        events={events}
        onRefresh={onRefresh}
      />
    );
  }
}
