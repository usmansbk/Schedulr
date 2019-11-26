import React from 'react';
import { withApollo } from 'react-apollo';
import memoize from 'memoize-one';
import Form from 'components/forms/Event';
import { getUserSchedules } from 'api/fragments';

class EditEventScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();

  _schedules = memoize(() => {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  });

  get initialValues() {
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
      category,
      recurrence,
      until,
      forever,
      schedule,
      isPublic
    } = event;
    const currentSchedule = this.schedules.find(item => item.id === schedule.id);
    return ({
      title,
      description: description || '',
      venue: venue || '',
      startAt: refStartAt || startAt,
      endAt: refEndAt || endAt,
      allDay: Boolean(allDay),
      category,
      recurrence,
      until,
      forever: forever !== undefined ? forever : true,
      eventScheduleId: currentSchedule ? currentSchedule.id : null,
      isPublic: Boolean(isPublic),
      location: currentSchedule ? currentSchedule.location : null
    });
  };
  
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    this.props.onSubmit({ id, ...form });
    this.props.navigation.pop(2);
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