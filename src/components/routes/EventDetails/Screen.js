import React from 'react';
import { Appbar } from 'react-native-paper';
import Details from './Details';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  id,
  title,
  date,
  nextDate,
  type,
  location,
  groupName,
  groupId,
  repeat,
  createdAt,
  updatedAt,
  description,
  start,
  starred,
  starsCount,
  commentsCount,
  isAuthor,
  isValid,
  isCancelled,
  handleBack,
  handleDelete,
  handleRepeat,
  handleEdit,
  handleCancel,
  navigateToGroup,
  navigateToComments,
}) => (
  <React.Fragment>
    <Appbar.Header style={styles.header}  collapsable>
      <Appbar.BackAction color={colors.gray} onPress={handleBack} />
      <Appbar.Content titleStyle={styles.headerColor} title="Details" />
      {
        isAuthor && (
          <React.Fragment>
            <Appbar.Action
              icon="delete"
              color={colors.gray}
              onPress={handleDelete}
            />
            <Appbar.Action
              icon="repeat"
              color={colors.gray}
              onPress={handleRepeat}
            />
            {
              isValid && (
                <React.Fragment>
                  <Appbar.Action
                    icon="mode-edit"
                    color={colors.gray}
                    onPress={handleEdit}
                  />
                  <Appbar.Action
                    icon="close"
                    color={color.gray}
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
      nextDate={nextDate}
      type={type}
      location={location}
      groupName={groupName}
      groupId={groupId}
      repeat={repeat}
      createdAt={createdAt}
      updatedAt={updatedAt}
      description={description}
      start={start}
      starred={starred}
      starsCount={starsCount}
      commentsCount={commentsCount}
      isCancelled={isCancelled}
      navigateToGroup={navigateToGroup}
      navigateToComments={navigateToComments}
    />
  </React.Fragment>
)