import React from 'react';
import moment from 'moment';
import uuidv5 from 'uuid/v5';
import uuidv4 from 'uuid/v4';
import { withApollo } from 'react-apollo';
import Form from 'components/forms/Event';
import recurrences from 'components/forms/Event/recurrence';
import { isPastExact } from 'lib/time';
import { getUserSchedules } from 'api/fragments';
import { SCHEDULE_CLOSED } from "lib/constants";

class NewEventScreen extends React.Component {
  _newSchedule = () => this.props.navigation.navigate("NewSchedule", { popAfterCreation: true });
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = uuidv4();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      ...form
    };
    await this.props.onSubmit(input);
    this.props.navigation.replace('EventDetails', {
      id
    });
  };

  get schedules() {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  }
  
  _getInitialValues = () => {
    const { event={}, navigation } = this.props;
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
      forever,
      isPublic=true,
      schedule,
    } = event;

    const eventScheduleId = navigation.getParam("eventScheduleId", schedule && schedule.id);
    const currentSchedule = this.schedules && this.schedules.find(schedule => schedule.id === eventScheduleId);

    const targetDate = navigation.getParam('targetDate', moment().toISOString());
    const targetStartAt = targetDate;
    const targetEndAt = moment(targetDate).add(2, 'hours').toISOString();
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
    const start = newStart || targetStartAt;
    const end = newEnd || targetEndAt;

    return ({
      title,
      description: description || '',
      venue: venue || '',
      startAt: start,
      endAt: end,
      allDay,
      category,
      recurrence: recurrence || recurrences[0].id,
      until,
      forever: forever !== undefined ? forever : true,
      eventScheduleId,
      isPublic: currentSchedule ? currentSchedule.isPublic : Boolean(isPublic)
    });
  };

  render() {
    return (
      <Form
        initialValues={this._getInitialValues()}
        isNew={this.props.isNew}
        schedules={this.schedules.filter(schedule => (schedule.status !== SCHEDULE_CLOSED))}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newSchedule={this._newSchedule}
        locked={Boolean(this.props.scheduleId)}
      />
    )
  }
}

export default withApollo(NewEventScreen);