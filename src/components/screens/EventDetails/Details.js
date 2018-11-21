import React from 'react';
import moment from 'moment';
import Details from '../../routes/EventDetails';
import DeleteDialog from '../../dialogs/DeleteEvent';
import CancelDialog from '../../dialogs/CancelEvent';
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
  state = {
    visibleDialog: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _handleDelete = () => this.setState({ visibleDialog: 'delete' });
  _handleEdit = () => this.props.navigation.navigate('NewEvent', { id: this.props.id });
  _handleRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.id });
  _handleCancel = () => this.setState({ visibleDialog: 'cancel' });
  _navigateToGroup = (id) => alert('To group ' + id);
  _navigateToComments = (id) => alert('To comments ' + id);
  _handleShare = ({title, location, date, id}) =>  alert(`${title} - ${location} - ${date} - ${id}`);
  _handleMaps = (location) => alert('Open map to ' + location);
  _isValid = (isCancelled, end) => (!isCancelled) && (Date.now() < end);
  _hideDialog = () => this.setState({ visibleDialog: false });
  
  render() {
    const { visibleDialog } = this.state;
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
      <React.Fragment>
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
      <DeleteDialog
        id={id}
        visible={visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      <CancelDialog
        id={id}
        visible={visibleDialog === 'cancel'}
        handleDismiss={this._hideDialog}
      />
      </React.Fragment>
    )
  }
}