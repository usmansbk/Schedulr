import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { Auth } from 'aws-amplify';
import Loading from './Loading';
import NavigationService from '../../../config/navigation';

export default class Container extends Component {
  constructor(props) {
    super(props);
  }

  _bootstrapAsync = async (url) => {
    let userToken = null;
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      userToken = currentUser;
      if (url && userToken) {
        NavigationService.deepLinkNavigate(url)
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

  render() {
    return (
      <Loading />
    );
  }
}
