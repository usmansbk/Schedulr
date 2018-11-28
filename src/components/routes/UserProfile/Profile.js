import React from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Text,
  Caption
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default ({
  goBack,
  name=defaultProps.name,
  pictureUrl=defaultProps.pictureUrl,
  following=defaultProps.following,
  groupsCount=defaultProps.groupsCount,
  joined=defaultProps.joined
}) => (
  <React.Fragment>
    <Appbar.Header style={[appStyles.header, styles.appbar]} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={goBack} />
    </Appbar.Header>
    <View style={styles.container}>
      <View style={styles.header}> 
        <UserAvatar
          name={name}
          src={pictureUrl}
          rounded
          size={AVATAR_SIZE}
          component={CachedImage}
        />
        <Text
          style={styles.headline}
        >
          {name}
        </Text>
        <View style={styles.subheading}>
          <Text style={styles.note}>{following} Following</Text>
          <Text style={styles.note}> - </Text>
          <Text style={styles.note}>{groupsCount} Groups</Text>
        </View>
        <Caption style={styles.caption}>Joined {joined}</Caption>
      </View>
    </View>
  </React.Fragment>
);

const defaultProps = {
  name: 'Babakolo Usman Suleiman',
  pictureUrl: null,
  following: 2000,
  groupsCount: 2888,
  joined: 'Mon 12, November 2018'
}