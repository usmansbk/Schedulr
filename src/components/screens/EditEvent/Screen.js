import React from 'react';
import { withApollo } from 'react-apollo';
import Form from 'components/forms/Event';
import { getUserSchedules } from 'api/fragments';

class EditEventScreen extends React.Component {
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
      category,
      recurrence,
      until,
      schedule,
      isPublic
    } = event;
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
      eventScheduleId: schedule && schedule.id,
      isPublic: Boolean(isPublic)
    });
  };
  
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    await this.props.onSubmit({ id, ...form });
    this.props.navigation.pop();
  };
  
  get schedules() {
    const data = this.props.client.readFragment({
      fragment: getUserSchedules,
      id: `User:${this.props.stores.appState.userId}`
    });
    return (data && data.created && data.created.items) || [];
  }
  
  render() {
    const { event: { schedule } } = this.props;

    return (
      <Form
        handleCancel={this._handleBack}
        schedules={this.schedules}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        edit
        locked={Boolean(schedule)}
      />
    )
  }
}

export default withApollo(EditEventScreen);