import React from 'react';
import {
  Appbar,
} from 'react-native-paper';
import Events from '../../lists/Events';
import Fab from '../../common/Fab';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

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
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={onPress} />
      <Appbar.Content
        title={name}
        subtitle={description}
        titleStyle={styles.headerColor}
      />
      <Appbar.Action
        icon="share"
        onPress={() => handleShare({ name, description, id})}
        color={colors.gray}
      />
      <Appbar.Action
        icon="info-outline"
        onPress={navigateToGroupInfo}
        color={colors.gray}
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