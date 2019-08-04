import React from 'react';
import Form from 'components/forms/Schedule';

export default class EditScheduleScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    await this.props.onSubmit({ id, ...form });
    this.props.navigation.pop();
  };

  _getInitialValues = () => {
    const { board } = this.props;
    if (!board) return undefined;
    return ({
      name: board.name,
      description: board.description || '',
      isPublic: Boolean(board.isPublic)
    });
  };
  
  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        handleCancel={this._handleBack}
        edit
      />
    )
  }
}