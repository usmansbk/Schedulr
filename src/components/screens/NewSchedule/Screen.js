import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Form from 'components/forms/Schedule';

export default class NewScheduleScreen extends React.Component {
  
  componentDidMount = () => {
    this.fetchLocation = setTimeout(this.props.stores.locationStore.fetchLocation, 200);
  };

  componentWillUnmount = () => clearTimeout(this.fetchLocation);
  
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (form) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      ...form
    };
    const result = await this.props.onSubmit(input);
    const popAfterCreation = await this.props.navigation.getParam('popAfterCreation');

    if (popAfterCreation) {
      this.props.navigation.pop();
    } else {
      this.props.navigation.replace('Schedule', {
        id: result.data.createSchedule.id
      });
    }
  };

  get getInitialValues() {
    return ({
      name: '',
      description: '',
      isPublic: true,
      location: this.props.stores.locationStore.location,
    });
  }

  render() {
    return (
      <Form
        initialValues={this.getInitialValues}
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}