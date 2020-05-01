import React from 'react';
import uuidv5 from 'uuid/v5';
import { I18n } from 'aws-amplify';
import { withNavigationFocus } from 'react-navigation';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import schdlAll from 'helpers/setReminders';
import { mergeEvents } from 'lib/utils';
import { InteractionManager } from 'react-native';
import snackbar from 'helpers/snackbar';

class Events extends React.Component {
  static defaultProps = {
    mutedEvents: [],
    allowedEvents: []
  };
  state = {
    data: null,
    events: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data) {
      console.log('state changed');
      return {
        data: props.data,
        events: mergeEvents(props.data, props.calendarEvents)
      };
    }
    return null;
  }

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  
  componentDidUpdate = () => {
    const { mutedEvents, allowedEvents } = this.props;
    InteractionManager.runAfterInteractions(() => schdlAll(
      this.state.events,
      mutedEvents,
      allowedEvents
    ));
  };
 
  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId : uuidv5(this.props.id, uuidv5.DNS)
    });
  };

  _sync = () => {
    if (this.props.isConnected) {
      snackbar(I18n.get('TOAST_fetchingUpdates'));
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
          navigation={this.props.navigation}
          loading={this.props.loading}
          fetchMore={this._sync}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}

export default withNavigationFocus(Events);