import React from 'react';
import { Appbar } from 'react-native-paper';
import Details from './Details';

export default ({
  id=1,
  title='(No title)',
  date=`Tuesday, 20 November\n02:30 - 03:30`,
  type='Work',
  location="No location truly",
  groupName='Dev Mode',
  repeat='Never',
  createdAt='Nov 20, 2018',
  description='No description',
  status='Ongoing',
  starred,
  starsCount=2000,
  commentsCount=238,
  handleBack,
  handleDelete,
  handleRepeat,
  handleEdit,
  handleCancel,
  navigateToGroup
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
      repeat={repeat}
      createdAt={createdAt}
      description={description}
      status={status}
      starred={starred}
      starsCount={starsCount}
      commentsCount={commentsCount}
      navigateToGroup={navigateToGroup}
    />
  </React.Fragment>
)