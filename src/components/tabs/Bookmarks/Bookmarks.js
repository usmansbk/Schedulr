import React from 'react';
import List from 'components/lists/Bookmarks';

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
        bookmarked
        navigation={navigation}
        loading={loading}
        events={events}
        onRefresh={onRefresh}
      />
    );
  }
}
