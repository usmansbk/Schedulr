import React from 'react';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Form from '../../forms/Event';
import eventTypes from '../../forms/types';
import frequency from '../../forms/frequency';

export default class NewEventScreen extends React.Component {
  static defaultProps = {
    boards: []
  };
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    try {
      const result = await this.props.onSubmit(form);
      this.props.navigation.replace('EventDetails', {
        id: result.data.createEvent.id
      });
    } catch(error) {
      Toast.show('Failed to create', Toast.SHORT);
    }
  };
  _getInitialValues = () => {
    const { event={}, boardId } = this.props;
    const {
      title='',
      description='',
      location,
      startAt,
      endAt,
      allDay,
      eventType,
      repeat,
      board
    } = event;

    return ({
      title: title,
      description: description,
      location: location || { address: '' },
      startAt: startAt || moment().toDate().toISOString(),
      endAt: endAt || moment().add(2, 'hours').toDate().toISOString(),
      allDay: Boolean(allDay),
      eventType: eventTypes[0].id,
      repeat: frequency[0].id,
      boardId: board.id || boardId
    });
  };
  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        boards={this.props.boards.filter(board => board.isAuthor)}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}