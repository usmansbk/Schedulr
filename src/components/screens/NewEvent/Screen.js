import React from 'react';
import moment from 'moment';
import Form from 'components/forms/Event';
import recurrences from 'components/forms/Event/recurrence';
import { isPastExact } from 'lib/parseItem';
import { getUserSchedules } from 'api/fragments';
import client from 'config/client';

export default class NewEventScreen extends React.Component {
  _newSchedule = () => this.props.navigation.navigate("NewSchedule", { popAfterCreation: true });
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    const result = await this.props.onSubmit(form);
    this.props.navigation.replace('EventDetails', {
      id: result.data.createEvent.id
    });
  };

  get schedules() {
    // console.log(client.cache);
    const data = client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  }
  
  _getInitialValues = () => {
    const { event={}, scheduleId } = this.props;
    const {
      title,
      description,
      venue,
      startAt,
      endAt,
      allDay,
      category,
      recurrence,
      until,
      isPublic,
      schedule,
    } = event;

    const targetScheduleId = scheduleId || (schedule && schedule.id);
    const currentSchedule = this.schedules && this.schedules.find(schedule => schedule.id === targetScheduleId);

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
      title,
      description: description || '',
      venue: venue || '',
      startAt: start,
      endAt: end,
      allDay,
      category: category || 'Event',
      recurrence: recurrence || recurrences[0].id,
      until,
      eventScheduleId: targetScheduleId,
      isPublic: currentSchedule ? currentSchedule.isPublic : Boolean(isPublic)
    });
  };

  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        isNew={this.props.isNew}
        schedules={this.schedules.filter(schedule => (schedule.status !== 'CLOSED') && (schedule.id[0] !== '-'))}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newSchedule={this._newSchedule}
        locked={Boolean(this.props.scheduleId)}
      />
    )
  }
}