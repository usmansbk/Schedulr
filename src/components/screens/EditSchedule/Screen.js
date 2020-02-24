import React from 'react';
import Form from 'components/forms/Schedule';

export default class EditScheduleScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  
  _onSubmit = async (form) => {
    const id = this.props.navigation.getParam('id');
    this.props.onSubmit({ id, ...form });
    this.props.navigation.pop();
  };

  get initialValues() {
    const { schedule } = this.props;
    if (!schedule) return undefined;
    return ({
      name: schedule.name,
      description: schedule.description || '',
      isPublic: Boolean(schedule.isPublic),
      location: schedule.location || '',
      topic: schedule.topic || ''
    });
  };

  render() {
    return (
      <Form
        initialValues={this.initialValues}
        onSubmit={this._onSubmit}
        handleCancel={this._handleBack}
        edit
      />
    )
  }
}