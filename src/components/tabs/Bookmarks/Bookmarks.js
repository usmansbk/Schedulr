import React from 'react';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {
  _getEvents = (
    (data) => {
      if (!data) return [];
      const { bookmarks } = data;
      return bookmarks.items.map(item => item.event)
    }
  );

  get events() {
    return this._getEvents(this.props.data);
  }
  
  render() {
    const {
      navigation,
      fetchMore,
      nextToken,
      loading,
    } = this.props;

    return (
      <List
        navigation={navigation}
        events={this.events}
        nextToken={nextToken}
        fetchMore={fetchMore}
        loading={loading}
      />
    );
  }
}
