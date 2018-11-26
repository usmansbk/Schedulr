import React from 'react';
import Help from '../../routes/Help';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Help
        goBack={this._goBack}
      />
    );
  }
}