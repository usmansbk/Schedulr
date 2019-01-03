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
      description: description || '',
      location: location || { address: '' },
      startAt,
      endAt,
      allDay: Boolean(allDay),
      eventType,
      repeat,
      boardId: board.id
    });
  };
  _onSubmit =  async (form) => {
    const id = this.props.navigation.getParam('id');
    delete form.boardId;
    try {
      await this.props.onSubmit({ id, ...form });
      this.props.navigation.pop();
    } catch(error) {
      Toast.show(err, Toast.SHORT);
      console.log(error.message);
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