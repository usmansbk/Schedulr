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
 
  componentDidMount = () => {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[1];
    switch(routeName) {
      case 'event':
        NavigationService.navigate('EventDetails', { id });
        break;
      case 'board':
        NavigationService.navigate('BoardInfo', { id });
        break;
      default:
        break;
    }
  }

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

