import React from 'react';
import Form from '../components/forms/Group';

export default class NewGroupScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <Form handleCancel={this._handleBack} />
    )
  }
}