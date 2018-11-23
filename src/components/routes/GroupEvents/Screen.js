import React from 'react';
import { View } from 'react-native';
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
  following,
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
      {
        !isAdmin && (
          <Appbar.Action
            icon={`person${following ? '' : '-add'}`}
          />
        )
      }
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
          onPress={navigateToNewEvent}
        />
      )
    }
  </React.Fragment>
)