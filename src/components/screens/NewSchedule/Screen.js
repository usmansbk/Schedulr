import React from 'react';
import Form from 'components/forms/Schedule';

export default class NewScheduleScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    const result = await this.props.onSubmit(input);
    const popAfterCreation = await this.props.navigation.getParam('popAfterCreation');

    if (popAfterCreation) {
      this.props.navigation.pop();
    } else {
      this.props.navigation.replace('Schedule', {
        id: result.data.createSchedule.id,
        cacheFirst: true
      });
    }
  };

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}