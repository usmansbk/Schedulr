import React from 'react'
import Button from './Button';

export default class Container extends React.Component {

  state = {
    loading: false
  };

  _signIn = async () => {
    this.setState({ loading: true });
    await this.props.onLogin('Google');
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <Button
        loading={loading}
        disabled={loading}
        onPress={this._signIn}
      />
    )
  }
}