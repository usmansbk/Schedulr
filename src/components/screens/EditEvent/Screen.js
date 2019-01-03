import React from 'react';
import Toast from 'react-native-simple-toast';
import Form from '../../forms/Event';

export default class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _getInitialValues = () => {
    const { event } = this.props;
    if (!event) return undefined;
    const {
      title,
      description,
      location,
      startAt,
      endAt,
      allDay,
      eventType,
      repeat,
      board
    } = event;
    return ({
      title,
      description,
      location: location || {},
      startAt,
      endAt,
      allDay,
      eventType,
      repeat,
      boardId: board.id
    });
  };
  _onSubmit =  async (form) => {
    console.log(form);
    const id = this.props.navigation.getParam('id');
    try {
      await this.props.onSubmit({ id, ...form });
      this.props.navigation.replace('EventDetails', { id });
    } catch(error) {
      Toast.show('Failed to update', Toast.SHORT);
      console.log(error.message);
    }
  };
  
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        boards={this.props.boards}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        locked
      />
    )
  }
}