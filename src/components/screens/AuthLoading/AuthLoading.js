import React, { Component } from 'react'
import { AsyncStorage, StatusBar } from 'react-native';
import Loading from './Loading';
import colors from '../../../config/colors';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }
  
  render() {
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor={colors.primary_dark}
          barStyle="light-content"
        />
        <Loading />
      </React.Fragment>
    )
  }
}
