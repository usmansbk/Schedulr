import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import Form from 'components/forms/Event';
import frequency from 'components/forms/Event/frequency';
import { isPastExact } from 'lib/parseItem';
import { BOARD_CLOSED } from 'lib/constants';

export default class NewEventScreen extends React.Component {
  static defaultProps = {
    boards: []
  };
  _newBoard = () => this.props.navigation.navigate("NewBoard");
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
      try {
        const result = await this.props.onSubmit(form);
        this.props.navigation.replace('EventDetails', {
          id: result.data.createEvent.id
        });
      } catch(error) {
        SimpleToast.show(error.message, SimpleToast.SHORT);
      }
  };
  _getInitialValues = () => {
    const { event={}, boardId, boards } = this.props;
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
      isPublic
    } = event;

    const currentBoard = boards && boards.find(board => board.id === boardId);

    const targetDate = this.props.navigation.getParam('targetDate', moment().toISOString())
    const initialStartAt = moment(targetDate).toISOString();
    const initialEndAt = moment(targetDate).add(2, 'hours').toISOString();
    let newStart = startAt;
    let newEnd = endAt;

    if (startAt) {
      const currentStart = moment(startAt);
      const currentEnd = moment(endAt);
      const duration = Math.abs(moment.duration(currentStart.diff(currentEnd)));
      
      const startSec = currentStart.seconds();
      const startMins = currentStart.minutes();
      const startHours = currentStart.hours();
      
      newStart = moment().seconds(startSec).minutes(startMins).hours(startHours).toISOString();
      if (isPastExact(newStart)) {
        newStart = moment(newStart).add(1, 'day').toISOString();
      }
      newEnd = moment(newStart).add(duration).toISOString();
    }
    const start = newStart || initialStartAt;
    const end = newEnd || initialEndAt;

    return ({
      title: title || '',
      description: description || '',
      venue: venue || '',
      startAt: start,
      endAt: end,
      allDay: Boolean(allDay),
      eventType: eventType || 'Normal',
      repeat: repeat || frequency[0].id,
      until,
      forever,
      boardId: boardId,
      isPublic: currentBoard ? currentBoard.isPublic : Boolean(isPublic)
    });
  };

  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        isNew={this.props.isNew}
        boards={this.props.boards.filter(board => board.isAuthor && (board.status !== BOARD_CLOSED) && (board.id[0] !== '-'))}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newBoard={this._newBoard}
        locked={Boolean(this.props.boardId)}
      />
    )
  }
}