import React, { PureComponent } from 'react';
import FBLoginButton from '../FBLoginButton';
import GLoginButton from '../GLoginButton';

export default class LoginButton extends PureComponent {
  render() {
    const { agent, isLoggedIn } = this.props;

    if (agent === 'google') return <GLoginButton isLoggedIn={isLoggedIn} />;
    return <FBLoginButton />;
  }
}