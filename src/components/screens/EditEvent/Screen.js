import React from 'react';
import { withApollo } from 'react-apollo';
import Form from 'components/forms/Event';
import { getUserSchedules } from 'api/fragments';

class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();

  _schedules = () => {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  };

  get initialValues() {
    const { event } = this.props;

    if (!event) return undefined;
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
      isPublic
    } = event;
    const currentSchedule = this.schedules.find(item => item.id === schedule.id) || {};
    return ({
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
      isPublic,
      location: currentSchedule.location,
      eventScheduleId: currentSchedule.id
    });
  };
  
  _onSubmit = (form) => {
    const id = this.props.navigation.getParam('id');
    this.props.navigation.goBack();

    setTimeout(() => {
      this.props.onSubmit({ id, ...form });
    }, 0);
  };
  
  get schedules() {
    return this._schedules();
  }

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        schedules={this.schedules}
        initialValues={this.initialValues}
        onSubmit={this._onSubmit}
        edit
        locked
      />
    )
  }
}

export default withApollo(EditEventScreen);