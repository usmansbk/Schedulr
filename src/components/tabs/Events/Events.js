import React from 'react';
import uuidv5 from 'uuid/v5';
import memoize from 'memoize-one';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import schdlAll from 'helpers/setReminders';
import { mergeEvents } from 'lib/utils';

export default class Events extends React.Component {
  static defaultProps = {
    mutedEvents: [],
    allowedEvents: []
  }

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  
  componentDidUpdate = () => {
    const { mutedEvents, allowedEvents } = this.props;
    schdlAll(
      this.events,
      mutedEvents,
      allowedEvents
    );
  };
 
  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId : uuidv5(this.props.id, uuidv5.DNS)
    });
  };

  _onRefresh = () => {
    if (!this.props.loading) {
      this.props.onRefresh && this.props.onRefresh();
    }
  };
  
  _mergeAllEvents = memoize(mergeEvents);

  get events() {
    return this._mergeAllEvents(this.props.data);
  }

  _sync = () => {
    this.props.fetchNotifications();
    this.props.deltaSync();
  };

  componentDidMount = () => {
    if (!this.props.loading) {
      this._sync();
    }
  };

  render() {
    return (
      <>
        <List
          isAuth
          events={this.events}
          navigation={this.props.navigation}
          onRefresh={this._onRefresh}
          loading={this.props.loading}
          fetchMore={this._sync}
          updateListEveryMinute={new Date().getMinutes()}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}
