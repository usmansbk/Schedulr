import React from 'react';
import Toast from 'react-native-simple-toast';
import Form from '../../forms/Board';

export default class EditBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  _onSubmit =  async (form) => {
    const id = this.props.navigation.getParam('id');
    console.log(form);
    try {
      await this.props.onSubmit({id, ...form});
      this.props.navigation.replace('BoardEvents', { id });
    } catch(error) {
      Toast.show('Failed to create', Toast.SHORT);
      console.log(error);
    }
  };

  _getInitialValues = () => {
    const { board } = this.props;
    if (!board) return undefined;
    return ({
      name: board.name,
      description: board.description,
      isPublic: board.isPublic
    });
  };
  
  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        handleCancel={this._handleBack}
      />
    )
  }
}