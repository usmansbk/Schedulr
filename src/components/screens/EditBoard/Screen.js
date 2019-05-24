import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import Form from 'components/forms/Board';

export default class EditBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    try {
      await this.props.onSubmit({ id, ...form });
      this.props.navigation.pop();
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
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