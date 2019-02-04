import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { Auth } from 'aws-amplify';
import Loading from './Loading';
import NavigationService from '../../../config/navigation';

export default class Container extends Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }

  _bootstrapAsync = async (url) => {
    let userToken = null;
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      userToken = currentUser;
      if (url && userToken) {
        this.navigate(url)
      } else {
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      this.props.navigation.navigate('Auth');
    }
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(this._bootstrapAsync);
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this._bootstrapAsync(event.url);
  }

  navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[1];
    alert(`${routeName} - ${id}`)
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
    return (
      <Loading />
    );
  }
}
