import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import Form from 'components/forms/Event';

export default class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _getInitialValues = () => {
    const { event } = this.props;
    const refStartAt = this.props.navigation.getParam('refStartAt');
    const refEndAt = this.props.navigation.getParam('refEndAt');

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
      until,
      forever,
      board,
      isPublic
    } = event;
    return ({
      title,
      description: description || '',
      venue: venue || '',
      startAt: refStartAt || startAt,
      endAt: refEndAt || endAt,
      allDay: Boolean(allDay),
      eventType,
      repeat,
      until,
      forever,
      boardId: board && board.id,
      isPublic: Boolean(isPublic)
    });
  };
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    try {
      await this.props.onSubmit({ id, ...form });
      this.props.navigation.pop()
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT)
    }
  };
  
  render() {
    const { event: { board } } = this.props;

    return (
      <Form
        handleCancel={this._handleBack}
        boards={this.props.boards.filter(board => board.isAuthor)}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        edit
        locked={Boolean(board)}
      />
    )
  }
}