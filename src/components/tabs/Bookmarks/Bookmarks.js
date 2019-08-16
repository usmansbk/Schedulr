import React from 'react';
import memoize from 'memoize-one';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return nextProps.navigation.isFocused();
  };

  _getEvents =data => data.bookmarks.items.filter(item => Boolean(item.event)).map(item => item.event);

  get events() {
    const { data } = this.props;
    if (!data) return [];
    return this._getEvents(data);
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
