import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import {withApollo} from 'react-apollo';
import Form from 'components/forms/Event';
import {isPastDate} from 'lib/time';
import {
  toISOString,
  add,
  getDuration,
  castDateTime,
  date,
  addDuration,
  diffDuration,
} from 'lib/date';
import {getUserSchedules} from 'api/fragments';
import {SCHEDULE_CLOSED, ONE_TIME_EVENT} from 'lib/constants';
import logger from 'config/logger';

class NewEventScreen extends React.Component {
  _newSchedule = () => this.props.navigation.navigate('NewSchedule');
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = (form) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {id, ...form};
    this.props.navigation.goBack();
    this.timer = setTimeout(() => {
      this.props.onSubmit(input);
      logger.log('create_event');
    }, 0);
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  get schedules() {
    return this._schedules();
  }

  get getInitialValues() {
    const {event = {}, navigation} = this.props;
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
      location,
      forever,
      schedule,
    } = event;

    const eventScheduleId = navigation.getParam(
      'eventScheduleId',
      schedule ? schedule.id : this.schedules[0].id,
    );
    const currentSchedule =
      this.schedules &&
      this.schedules.find((schedule) => schedule.id === eventScheduleId);

    const targetDate = navigation.getParam('targetDate', toISOString());
    const targetEndAt = toISOString(add(targetDate, 2, 'hours'));
    let newStart = startAt;
    let newEnd = endAt;

    if (startAt) {
      const duration = Math.abs(getDuration(diffDuration(startAt, endAt)));
      newStart = toISOString(castDateTime(startAt, date()));
      if (isPastDate(newStart)) {
        newStart = toISOString(add(newStart, 1, 'day'));
      }
      newEnd = toISOString(addDuration(newStart, duration));
    }
    const start = newStart || targetDate;
    const end = newEnd || targetEndAt;

    return {
      title,
      description,
      venue,
      startAt: start,
      endAt: end,
      allDay,
      recurrence: recurrence || ONE_TIME_EVENT,
      until,
      forever,
      eventScheduleId,
      location:
        location ||
        currentSchedule?.location ||
        this.props.stores.location.location,
      category: category || this.props.stores.appState.categories[0],
      isPublic: currentSchedule?.isPublic,
    };
  }

  _filterSchedules = (list) =>
    list.filter((schedule) => schedule.status !== SCHEDULE_CLOSED);

  _schedules = () => {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`,
    });
    return (data && data.created && data.created.items) || [];
  };

  render() {
    return (
      <Form
        initialValues={this.getInitialValues}
        schedules={this._filterSchedules(this.schedules)}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newSchedule={this._newSchedule}
        locked={this.props.navigation.getParam('locked')}
      />
    );
  }
}

export default withApollo(NewEventScreen);
