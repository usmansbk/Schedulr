import React from 'react';
import moment from 'moment';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import { withApollo } from 'react-apollo';
import memoize from 'memoize-one';
import { I18n } from 'aws-amplify';
import Form from 'components/forms/Event';
import recurrences from 'components/forms/Event/recurrence';
import { isPastExact } from 'lib/time';
import { getUserSchedules } from 'api/fragments';
import { SCHEDULE_CLOSED } from "lib/constants";
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';

class NewEventScreen extends React.Component {
  _newSchedule = () => this.props.navigation.navigate("NewSchedule");
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = (form) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = { id,...form };
    this.props.navigation.pop();
    setTimeout(() => {
      snackbar(I18n.get("EVENT_creating"));
      this.props.onSubmit(input);
      logger.log('create_event');
    }, 0);
  };

  get schedules() {
    return this._schedules();
  }

  componentWillUnmount = () => {
    if (this.waitAMoment) clearTimeout(this.waitAMoment);
  };
  
  get getInitialValues() {
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
      schedule,
    } = event;

    const eventScheduleId = navigation.getParam("eventScheduleId", schedule ? schedule.id : this.schedules[0].id);
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
      description,
      venue,
      startAt: start,
      endAt: end,
      allDay,
      category,
      recurrence: recurrence || recurrences[0].id,
      until,
      forever,
      eventScheduleId,
      location: currentSchedule && currentSchedule.location,
      isPublic: currentSchedule && currentSchedule.isPublic
    });
  }

  _filterSchedules = memoize((list) => (
    list.filter(schedule => (schedule.status !== SCHEDULE_CLOSED))
  ));

  _schedules = memoize(() => {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  });

  render() {
    return (
      <Form
        initialValues={this.getInitialValues}
        isNew={this.props.isNew}
        schedules={this._filterSchedules(this.schedules)}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
        newSchedule={this._newSchedule}
        locked={this.props.navigation.getParam('locked')}
      />
    )
  }
}

export default withApollo(NewEventScreen);