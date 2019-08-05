import React from 'react'
import Button from './Button';

export default class Container extends React.Component {

  _signIn = () => this.props.onLogin('Google');

  render() {
    const { loading } = this.props;
    return (
      <Button
        loading={loading}
        disabled={loading}
        onPress={this._signIn}
      />
    )
  }
}