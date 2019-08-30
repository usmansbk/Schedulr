import React from 'react';
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

  componentDidMount = () => {
    if (!this.props.loading) {
      this.props.fetchMore();
    }
  }

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

  _onRefresh = () => this.props.onRefresh && this.props.onRefresh();
  
  _mergeAllEvents = memoize(mergeEvents);

  get events() {
    return this._mergeAllEvents(this.props.data);
  }

  render() {
    return (
      <>
        <List
          events={this.events}
          navigation={this.props.navigation}
          onRefresh={this._onRefresh}
          loading={this.props.loading}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}