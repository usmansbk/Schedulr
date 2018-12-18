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
  name,
  pictureUrl,
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
      </View>
    </View>
  </React.Fragment>
);
