import React from 'react';
import Form from '../components/forms/Event';

export default class NewEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
      />
    )
  }
}