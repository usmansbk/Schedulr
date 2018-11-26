import React from 'react';
import Settings from '../../routes/Settings';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _handleValueChange = (id) => alert(id);
  render() {
    return (
      <Settings
        goBack={this._goBack}
        handleValueChange={this._handleValueChange}
      />
    );
  }
}