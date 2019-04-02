import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import Form from 'components/forms/Board';

export default class NewBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    try {
      const result = await this.props.onSubmit(input);
      this.props.navigation.replace('BoardEvents', {
        id: result.data.createBoard.id
      });
    } catch(error) {
      SimpleToast.show('Failed to create board: ' + error.message, SimpleToast.SHORT);
    }
  };

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}