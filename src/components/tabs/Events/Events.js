import React from 'react';
import uuidv5 from 'uuid/v5';
import {withNavigationFocus} from 'react-navigation';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import schdlAll from 'helpers/setReminders';
import {mergeEvents, injectAds} from 'lib/utils';
import {InteractionManager} from 'react-native';

class Events extends React.Component {
  static defaultProps = {
    mutedEvents: [],
    allowedEvents: [],
  };
  state = {
    data: null,
    events: [],
    calendarEvents: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.data !== state.data ||
      props.calendarEvents.length !== state.calendarEvents.length
    ) {
      return {
        data: props.data,
        events: injectAds(mergeEvents(props.data, props.calendarEvents)),
        calendarEvents: props.calendarEvents,
      };
    }
    return null;
  }

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  componentDidUpdate = () => {
    const {mutedEvents, allowedEvents} = this.props;
    InteractionManager.runAfterInteractions(() =>
      schdlAll(this.state.events, mutedEvents, allowedEvents),
    );
  };

  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId: uuidv5(this.props.id, uuidv5.DNS),
    });
  };

  _sync = () => {
    if (this.props.isConnected) {
      this.props.fetchNotifications();
      this.props.deltaSync();
      this.props.calendarSync();
    }
  };

  componentDidMount = () => {
    if (!this.props.loading && this.props.isConnected) {
      InteractionManager.runAfterInteractions(this._sync);
    }
  };

  render() {
    return (
      <>
        <List
          isAuth
          events={this.state.events}
          loading={this.props.loading}
          fetchMore={this._sync}
          navigation={this.props.navigation}
        />
        <FAB icon="plus" onPress={this._navigateToNewEvent} />
      </>
    );
  }
}

export default withNavigationFocus(Events);
