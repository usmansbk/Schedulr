import React from 'react';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return nextProps.navigation.isFocused();
  };

  _getEvents = (
    (data) => {
      if (!data) return [];
      const { bookmarks } = data;
      return bookmarks.items.filter(item => Boolean(item.event)).map(item => item.event)
    }
  );

  get events() {
    return this._getEvents(this.props.data);
  }
  
  render() {
    const {
      navigation,
    } = this.props;

    return (
      <List
        navigation={navigation}
        events={this.events}
      />
    );
  }
}
