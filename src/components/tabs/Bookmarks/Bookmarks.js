import React from 'react';
import List from 'components/lists/BookmarksEvents';

export default class Bookmarks extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return (nextProps.navigation.isFocused() &&
      (
        nextProps.events !== this.props.events ||
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
