import React from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Text
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
  groupsCount=defaultProps.groupsCount
}) => (
  <React.Fragment>
    <Appbar.Header style={appStyles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={goBack} />
      <Appbar.Content
        title="Profile"
        titleStyle={appStyles.headerColor}
      />
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
        <View>
          <Text>{following} following</Text>
          -
          <Text>{groupsCount} groups</Text>
        </View>
      </View>
    </View>
  </React.Fragment>
);

const defaultProps = {
  name: 'Babakolo Usman Suleiman',
  pictureUrl: null,
  following: 2000,
  groupsCount: 2888,
}