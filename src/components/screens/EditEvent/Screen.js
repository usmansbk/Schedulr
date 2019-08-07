import React from 'react';
import Form from 'components/forms/Event';

export default class EditEventScreen extends React.Component {
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
      recur,
      until,
      forever,
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
      recur,
      until,
      forever,
      scheduleId: schedule && schedule.id,
      isPublic: Boolean(isPublic)
    });
  };
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    await this.props.onSubmit({ id, ...form });
    this.props.navigation.pop();
  };
  
  render() {
    const { event: { schedule } } = this.props;

    return (
      <Form
        handleCancel={this._handleBack}
        schedules={this.props.schedules.filter(schedule => schedule.isOwner)}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
        edit
        locked={Boolean(schedule)}
      />
    )
  }
}