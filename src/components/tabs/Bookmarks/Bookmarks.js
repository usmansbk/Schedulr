import React from 'react';
import List from 'components/lists/Bookmarks';
import logger from 'config/logger';

export default class Bookmarks extends React.Component {
  shouldComponentUpdate = nextProps => {
    // nextProps.isFocused;
    return nextProps.data !== this.props.data;
  };

  componentDidMount = () => logger.log('bookmarks');

  get events() {
    const { data } = this.props;
    if (!data) return [];
    const { bookmarks } = data;
    // some bookmarked events may be missing
    const events = bookmarks.items.map(item => {
      if (!item.event) {
        const start = item.id.indexOf('-') + 1; // indicate missing events
        return item.id.slice(start);
      }
      return item.event;
    });
    return events;
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
