import React from 'react';
import Details from '../../routes/EventDetails';

export default class DetailsScreen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _handleDelete = () => alert('Delete');
  _handleEdit = () => alert('Edit');
  _handleRepeat = () => alert('Repeat');
  _handleCancel = () => alert('Cancel');
  _navigateToGroup = (id) => alert('To group ' + id);
  _navigateToComments = (id) => alert('To comments ' + id);
  _handleShare = ({title, location, date, id}) =>  alert(`${title} - ${location} - ${date} - ${id}`);
  _handleMaps = (location) => alert('Open map to ' + location);

  render() {
    return (
      <Details
        id={1}
        title='(No title)'
        date={`Tuesday, 20 November\n02:30 - 03:30`}
        type='Work'
        location="No location truly"
        groupName='Dev Mode'
        groupId={2}
        repeat='Never'
        createdAt='Nov 20, 2018'
        description='No description'
        status='Ongoing'
        starred
        starsCount={2001}
        commentsCount={239}
        handleBack={this._goBack}
        handleDelete={this._handleDelete}
        handleCancel={this._handleCancel}
        handleEdit={this._handleEdit}
        handleRepeat={this._handleRepeat}
        navigateToGroup={this._navigateToGroup}
        navigateToComments={this._navigateToComments}
        handleShare={this._handleShare}
        handleMaps={this._handleMaps}
      />
    )
  }
}