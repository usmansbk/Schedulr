import React from 'react';
import memoize from 'memoize-one';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {

  shouldComponentUpdate = (nextProps) => { 
    return nextProps.navigation.isFocused();
  };

  _getEvents = memoize(
    data => {
      const { bookmarks } = data;
      if (!bookmarks) return [];
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
