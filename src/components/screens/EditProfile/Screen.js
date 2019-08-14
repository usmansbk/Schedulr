import React from 'react';
import Form from 'components/forms/Profile';

export default class EditProfileScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _getInitialValues = () => {
    const { user } = this.props;

    if (!user) return undefined;
    const {
      name,
      website,
    } = user;
    return ({
      name,
      website: website || '',
    });
  };
  
  _onSubmit = async (form) => {
    const id = this.props.user.id;
    await this.props.onSubmit({ id, ...form });
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        initialValues={this._getInitialValues()}
        onSubmit={this._onSubmit}
      />
    )
  }
}