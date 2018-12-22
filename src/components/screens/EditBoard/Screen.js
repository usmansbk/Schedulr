import React from 'react';
import Form from '../../forms/Board';

export default class EditBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <Form handleCancel={this._handleBack} />
    )
  }
}