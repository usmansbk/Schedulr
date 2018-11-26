import React from 'react';
import Settings from '../../routes/Settings';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Settings
        goBack={this._goBack}
      />
    );
  }
}