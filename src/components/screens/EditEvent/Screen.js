import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import Form from '../../forms/Event';

export default class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _getInitialValues = () => {
    const { event } = this.props;
    const refStartAt = this.props.navigation.getParam('refStartDate');
    const refEndAt = this.props.navigation.getParam('refEndDate');

    if (!event) return undefined;
    const {
      title,
      description,
      venue,
      startAt,
      endAt,
      allDay,
      eventType,
      repeat,
      board
    } = event;
    return ({
      title,
      description: description || '',
      venue: {
        address: venue && venue.address || '',
        location: {
          longitude: venue && venue.location && venue.location.longitude,
          latitude: venue && venue.location && venue.location.latitude,
        }
      },
      startAt: refStartAt || startAt,
      endAt: refEndAt || endAt,
      allDay: Boolean(allDay),
      eventType,
      repeat,
      boardId: board.id
    });
  };
  _onSubmit = (form) => {
    const id = this.props.navigation.getParam('id');
    delete form.boardId;
    try {
      this.props.onSubmit({ id, ...form });
      this.props.navigation.pop();
    } catch(error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
  };
  
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        boards={this.props.boards.filter(board => board.isAuthor)}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        edit
        locked
      />
    )
  }
}