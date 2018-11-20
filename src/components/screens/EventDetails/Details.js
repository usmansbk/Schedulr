import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Details from '../../routes/EventDetails';
import { formatDate } from '../../../lib/time';

const defaultValues = {
  id: 1,
  title: '(No title)',
  start: new Date('11/10/2018'),
  end: Date.now(),
  type: 'Work',
  location: null,
  group: {
    name: 'Dev Mode',
    id: 2,
  },
  repeat: 'Never',
  createdAt: Date.now(),
  description: 'No description',
  isCancelled: true,
  starred: false,
  starsCount: 2001,
  commentsCount: 240,
  isAuthor: true,
};

const CANCELLED = 'Cancelled';
const ONGOING = 'Ongoing';
const PENDING = 'Pending';
const EXPIRED = 'Expired';

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
  _getStatus = (isCancelled, start, end) => {
    if (isCancelled) return CANCELLED;
    if (Date.now() > end) return EXPIRED;
    if (Date.now() < start) return PENDING;
    return ONGOING;
  };
  _formatDate = (start, end) => formatDate(start, end);

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
    const eventStatus = this._getStatus(isCancelled, start, end);
    const formattedDate = this._formatDate(start, end);
    const isValid = (eventStatus === ONGOING) || (eventStatus === PENDING);
    return (
      <Details
        id={id}
        title={title}
        date={formattedDate}
        type={type}
        location={location}
        groupName={group.name}
        groupId={group.id}
        repeat={repeat}
        createdAt={moment(createdAt).format('MMM DD, YYYY')}
        description={description}
        status={eventStatus}
        starred={starred}
        starsCount={numeral(starsCount).format('0a')}
        commentsCount={numeral(commentsCount).format('0a')}
        isAuthor={isAuthor}
        isValid={isValid}
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