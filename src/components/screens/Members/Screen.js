import React from 'react';
import Members from '../../routes/Members';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Members
        goBack={this._goBack}
      />
    )
  }
}