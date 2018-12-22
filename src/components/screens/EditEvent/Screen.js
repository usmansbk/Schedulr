import React from 'react';
import Form from '../../forms/Event';

export default class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        locked
      />
    )
  }
}