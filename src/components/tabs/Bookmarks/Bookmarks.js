import React from 'react';
import List from 'components/lists/Bookmarks';

export default class Bookmarks extends React.Component {
  _processEvents = (data) => {
      if (!data) return [];
      const { bookmarks } = data;
      const events = bookmarks.items.map(item => {
        if (!item.event) {
          const start = item.id.indexOf('-') + 1;
          return item.id.slice(start);
        }
        return item.event;
      });
      return events;
    };

  get events() {
    return this._processEvents(this.props.data);
  }
  
  render() {
    const {
      navigation,
      fetchMore,
      refresh,
      nextToken,
      loading,
    } = this.props;
    return (
      <List
        navigation={navigation}
        events={this.events}
        nextToken={nextToken}
        fetchMore={fetchMore}
        refresh={refresh}
        loading={loading}
      />
    );
  }
}
