import React from 'react';
import Toast from 'react-native-simple-toast';
import { Cache } from 'aws-amplify';
import Form from '../../forms/Event';

export default class NewEventScreen extends React.Component {
  static defaultProps = {
    boards: []
  }
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    try {
      const result = await this.props.onSubmit(input);
      this.props.navigation.replace('EventDetails', {
        id: result.data.createEvent.id
      });
    } catch(error) {
      Toast.show('Failed to create', Toast.SHORT);
      console.log(error.message);
    }
  }
  render() {
    return (
      <Form
        boards={this.props.boards.filter(board => board.isAuthor)}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}