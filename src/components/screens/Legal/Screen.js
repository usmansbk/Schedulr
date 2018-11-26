import React from 'react';
import Legal from '../../routes/Legal';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Legal
        goBack={this._goBack}
      />
    );
  }
}