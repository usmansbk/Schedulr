import React from 'react'
import Button from './Button';

export default class Container extends React.Component {
  _signIn = async () => {
    await this.props.onLogin('Facebook');
  }

  render() {
    return (
      <Button
        onPress={this._signIn}
      />
    )
  }
}