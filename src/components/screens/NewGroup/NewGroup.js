import React from 'react';
import Form from '../../forms/Group';

export default class NewGroupScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <Form handleCancel={this._handleBack} />
    )
  }
}