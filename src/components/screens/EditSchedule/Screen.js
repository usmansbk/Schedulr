import React from 'react';
import {I18n} from 'aws-amplify';
import Form from 'components/forms/Schedule';

export default class EditScheduleScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();

  _onSubmit = (form) => {
    const id = this.props.navigation.getParam('id');
    this.timer = setTimeout(() => {
      this.props.onSubmit({id, ...form});
    }, 0);
    this.props.navigation.goBack();
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  get initialValues() {
    const {schedule} = this.props;
    if (!schedule) return undefined;
    return {
      name: schedule.name,
      description: schedule.description,
      isPublic: schedule.isPublic,
      location: schedule.location,
      topic: schedule.topic || I18n.get('topics')[0],
    };
  }

  render() {
    return (
      <Form
        initialValues={this.initialValues}
        onSubmit={this._onSubmit}
        handleCancel={this._handleBack}
        edit
      />
    );
  }
}
