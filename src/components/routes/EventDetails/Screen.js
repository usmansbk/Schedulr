import React from 'react';
import { Appbar } from 'react-native-paper';
import Details from './Details';

export default ({
  id,
  title,
  date,
  type,
  location,
  groupName,
  groupId,
  repeat,
  createdAt,
  description,
  status,
  starred,
  starsCount,
  commentsCount,
  handleBack,
  handleDelete,
  handleRepeat,
  handleEdit,
  handleCancel,
  handleShare,
  handleMaps,
  navigateToGroup,
  navigateToComments,
}) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={handleBack} />
      <Appbar.Content />
      <Appbar.Action
        icon="delete"
        onPress={handleDelete}
      />
      <Appbar.Action
        icon="repeat"
        onPress={handleRepeat}
      />
      <Appbar.Action
        icon="mode-edit"
        onPress={handleEdit}
      />
      <Appbar.Action
        icon="close"
        onPress={handleCancel}
      />
    </Appbar.Header>
    <Details
      id={id}
      title={title}
      date={date}
      type={type}
      location={location}
      groupName={groupName}
      groupId={groupId}
      repeat={repeat}
      createdAt={createdAt}
      description={description}
      status={status}
      starred={starred}
      starsCount={starsCount}
      commentsCount={commentsCount}
      navigateToGroup={navigateToGroup}
      navigateToComments={navigateToComments}
      handleShare={handleShare}
      handleMaps={handleMaps}
    />
  </React.Fragment>
)