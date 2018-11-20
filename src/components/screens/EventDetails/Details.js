import React from 'react';
import moment from 'moment';
import Details from '../../routes/EventDetails';
import { formatDate } from '../../../lib/time';

const defaultValues = {
  id: 1,
  title: '(No title)',
  start: new Date('11/21/2018'),
  end: new Date('11/22/2018'),
  type: 'Work',
  location: null,
  group: {
    name: 'Dev Mode',
    id: 2,
  },
  repeat: 'Never',
  createdAt: new Date('11/20/2018'),
  description: 'No description',
  isCancelled: false,
  starred: false,
  starsCount: 2001,
  commentsCount: 2400000,
  isAuthor: true,
};

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

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
  _isValid = (isCancelled, end) => (!isCancelled) && (Date.now() < end);
  
  render() {
    const {
      id,
      title,
      start,
      end,
      type,
      location,
      group,
      repeat,
      createdAt,
      description,
      isCancelled,
      starred,
      starsCount,
      commentsCount,
      isAuthor,
    } = defaultValues;
    return (
      <Details
        id={id}
        title={title}
        date={formatDate(start, end)}
        type={type}
        location={location}
        groupName={group.name}
        groupId={group.id}
        repeat={repeat}
        createdAt={moment(createdAt).format(CREATED_DATE_FORMAT)}
        description={description}
        starred={starred}
        starsCount={starsCount}
        commentsCount={commentsCount}
        isAuthor={isAuthor}
        isValid={this._isValid(isCancelled, end)}
        isCancelled={isCancelled}
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