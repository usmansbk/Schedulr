import React from 'react';
import Toast from 'react-native-simple-toast';
import Form from '../../forms/Board';

export default class NewBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = (input) => {
    try {
      const result = this.props.onSubmit(input);
      this.props.navigation.replace('BoardEvents', {
        id: result.data.createBoard.id
      });
    } catch(error) {
      Toast.show('Failed to create', Toast.SHORT);
      console.log(error);
    }
  }
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}