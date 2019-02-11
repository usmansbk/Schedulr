import React from 'react';
import { Linking, Platform } from 'react-native';
import List from '../../lists/Events';
import FAB from '../../common/Fab';
import NavigationService from '../../../config/navigation';
import schdlAll from '../../../helpers/setReminders';
import SimpleToast from 'react-native-simple-toast';

export default class Events extends React.Component {
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  
  componentDidUpdate = () => {
    schdlAll(this.props.events);
  }
 
  componentDidMount = () => Linking.addEventListener('url', this.handleOpenURL);

  componentWillUnmount = () => Linking.removeEventListener('url', this.handleOpenURL);

  handleOpenURL = event => NavigationService.deepLinkNavigate(event.url);

  render() {
    const {
      loading,
      events,
      nextToken,
      error,
      onRefresh
    } = this.props;

    if (error) SimpleToast.show('Failed to load events', SimpleToast.SHORT);

    return (
      <React.Fragment>
        <List
          loading={loading}
          events={events}
          hasPreviousEvents={Boolean(nextToken)}
          onRefresh={onRefresh}
          error={error}
        />
        <FAB
          icon="edit"
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </React.Fragment>
    )
  }
}

