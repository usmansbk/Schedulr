import React from 'react';
import memoize from 'memoize-one';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import schdlAll from 'helpers/setReminders';

export default class Events extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };
  
  componentDidUpdate = () => {
    const { mutedEvents, allowedEvents } = this.props;
    schdlAll(
      this.events,
      mutedEvents,
      allowedEvents
    );
  };
 
  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent');
  };

  _getEvents = memoize(
    (data) => {
      let events = [];
      if (!data) return events;
    
      const { created, following, bookmarks } = data;

      created.items.forEach(schedule => {
        events = events.concat(schedule.events.items);
      });
      following.items.filter(item => Boolean(item.schedule)).forEach(schedule => {
        events = events.concat(schedule.events.items);
      });
      bookmarks.items.filter(item => Boolean(item.event) && !item.event.isOwner).forEach(bookmark => {
        events.push(bookmark.event);
      });
      return events;
    }
  );

  get events() {
    return this._getEvents(this.props.data);
  }

  render() {
    const {
      navigation,
      loading,
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          events={this.events}
          navigation={navigation}
          onRefresh={this._onRefresh}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}