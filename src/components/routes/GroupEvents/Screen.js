import React from 'react';
import {
  Appbar,
} from 'react-native-paper';
import Events from '../../lists/Events';
import Fab from '../../common/Fab';

export default ({
  onPress,
  id,
  name,
  description,
  isAdmin,
  handleShare,
  navigateToGroupInfo,
  navigateToNewEvent,
}) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={onPress} />
      <Appbar.Content
        title={name}
        subtitle={description}
      />
      <Appbar.Action
        icon="share"
        onPress={() => handleShare({ name, description, id})}
      />
      <Appbar.Action
        icon="info-outline"
        onPress={navigateToGroupInfo}
      />
    </Appbar.Header>
    <Events />
    {
      isAdmin && (
        <Fab
          icon="edit"
          onPress={() => navigateToNewEvent(id)}
        />
      )
    }
  </React.Fragment>
)