import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Form from 'components/forms/Schedule';
import logger from 'config/logger';

export default class NewScheduleScreen extends React.Component {
  
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      ...form
    };
    this.props.onSubmit(input);
    this.waitAMoment = setTimeout(() => this.props.navigation.replace('Schedule', { id }), 100);
    logger.log('create_schedule');
  };

  componentWillUnmount = () => {
    if (this.waitAMoment) clearTimeout(this.waitAMoment);
  };

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    );
  }
}