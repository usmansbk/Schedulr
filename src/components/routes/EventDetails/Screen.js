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
  isAuthor,
  isValid,
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
      {
        isAuthor && (
          <React.Fragment>
            <Appbar.Action
              icon="delete"
              color="#fff"
              onPress={handleDelete}
            />
            <Appbar.Action
              icon="repeat"
              color="#fff"
              onPress={handleRepeat}
            />
            {
              isValid && (
                <React.Fragment>
                  <Appbar.Action
                    icon="mode-edit"
                    color="#fff"
                    onPress={handleEdit}
                  />
                  <Appbar.Action
                    icon="close"
                    color="#fff"
                    onPress={handleCancel}
                  />
                </React.Fragment>
              )
            }
          </React.Fragment>
        )
      }
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