import React from 'react';
import { Linking } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import List from '../../lists/Events';
import FAB from '../../common/Fab';
import NavigationService from '../../../config/navigation';
import schdlAll from '../../../helpers/setReminders';
import { requestLocationPermission } from '../../../helpers/permissions';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this._handleDeeplink();
  }
  
  _handleDeeplink = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      NavigationService.deepLinkNavigate(url);
    }
  }
  
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  
  componentDidUpdate = () => {
    schdlAll(this.props.events);
  }
 
  componentDidMount = async () => {
    Linking.addEventListener('url', this.handleOpenURL);
    requestLocationPermission();
  };

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
      <>
        <List
          loading={loading}
          events={events}
          navigation={this.props.navigation}
          hasPreviousEvents={Boolean(nextToken)}
          onRefresh={onRefresh}
          error={error}
        />
        <FAB
          icon="edit"
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </>
    )
  }
}

