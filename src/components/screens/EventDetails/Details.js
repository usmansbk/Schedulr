import React from 'react';
import Details from '../../routes/EventDetails';

export default class DetailsScreen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _handleDelete = () => alert('Delete');
  _handleEdit = () => alert('Edit');
  _handleRepeat = () => alert('Repeat');
  _handleCancel = () => alert('Cancel');
  _navigateToGroup = () => alert('To group');

  render() {
    return (
      <Details
        handleBack={this._goBack}
        handleDelete={this._handleDelete}
        handleCancel={this._handleCancel}
        handleEdit={this._handleEdit}
        handleRepeat={this._handleRepeat}
        navigateToGroup={this._navigateToGroup}
      />
    )
  }
}