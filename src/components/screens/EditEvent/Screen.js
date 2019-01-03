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
    console.log(input);
    try {
      const result = await this.props.onSubmit(form);
      this.props.navigation.replace('EventDetails', {
        id: result.data.updateEvent.id
      });
    } catch(error) {
      Toast.show('Failed to update', Toast.SHORT);
      console.log(error.message);
    }
  }
  
  render() {
    if (error) {
      Toast.show('Item not in cache', Toast.SHORT);
    }
    return (
      <Form
        handleCancel={this._handleBack}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        locked
      />
    )
  }
}