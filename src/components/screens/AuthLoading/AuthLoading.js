import React, { Component } from 'react'
import { AsyncStorage } from 'react-native';
import Loading from '../../common/Loading/Loading';

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
      <Loading />
    )
  }
}
