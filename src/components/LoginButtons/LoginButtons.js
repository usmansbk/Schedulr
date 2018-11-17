import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LogoutButton from '../LogoutButton';
import FBLoginButton from '../FBLoginButton';
import GLoginButton from '../GLoginButton';

export default class LoginButtons extends PureComponent {
  render() {
    const { isLoggedIn, agent, handleLogin } = this.props;
    if (isLoggedIn) return (
      <LogoutButton isLoggedIn={isLoggedIn} agent={agent} />
    );

    return (
      <View>
        <GLoginButton handleLogin={handleLogin} />
        <FBLoginButton handleLogin={handleLogin} />
      </View>
    )
  }
}