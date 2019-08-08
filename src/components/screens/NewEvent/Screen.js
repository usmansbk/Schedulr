import React from 'react';
import moment from 'moment';
import Form from 'components/forms/Event';
import recurrence from 'components/forms/Event/recurrence';
import { isPastExact } from 'lib/parseItem';

export default class NewEventScreen extends React.Component {
  static defaultProps = {
    schedules: []
  };
  _newSchedule = () => this.props.navigation.navigate("NewSchedule", { popAfterCreation: true });
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    const result = await this.props.onSubmit(form);
    this.props.navigation.replace('EventDetails', {
      id: result.data.createEvent.id
    });
  };
  _getInitialValues = () => {
    const { event={}, scheduleId, schedules } = this.props;
    const {
      title,
      description,
      venue,
      startAt,
      endAt,
      allDay,
      category,
      recur,
      until,
      isPublic
    } = event;

    const currentSchedule = schedules && schedules.find(schedule => schedule.id === scheduleId);

    const targetDate = this.props.navigation.getParam('targetDate', moment().valueOf())
    const initialStartAt = moment(targetDate).valueOf();
    const initialEndAt = moment(targetDate).add(2, 'hours').valueOf();
    let newStart = startAt;
    let newEnd = endAt;

    if (startAt) {
      const currentStart = moment(startAt);
      const currentEnd = moment(endAt);
      const duration = Math.abs(moment.duration(currentStart.diff(currentEnd)));
      
      const startSec = currentStart.seconds();
      const startMins = currentStart.minutes();
      const startHours = currentStart.hours();
      
      newStart = moment().seconds(startSec).minutes(startMins).hours(startHours).valueOf();
      if (isPastExact(newStart)) {
        newStart = moment(newStart).add(1, 'day').valueOf();
      }
      newEnd = moment(newStart).add(duration).valueOf();
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
      category: category || 'Event',
      recur: recur || recurrence[0].id,
      until,
      scheduleId: scheduleId,
      isPublic: currentSchedule ? currentSchedule.isPublic : Boolean(isPublic)
    });
  };

  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        isNew={this.props.isNew}
        schedules={this.props.schedules.filter(schedule => schedule.isOwner && (schedule.status !== 'CLOSED') && (schedule.id[0] !== '-'))}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newSchedule={this._newSchedule}
        locked={Boolean(this.props.scheduleId)}
      />
    )
  }
}