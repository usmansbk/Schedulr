import React from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Text,
  Caption
} from 'react-native-paper';
import numeral from 'numeral';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default ({
  goBack,
  name=defaultProps.name,
  pictureUrl=defaultProps.pictureUrl,
  joined=defaultProps.joined,
  joinedCount=defaultProps.joinedCount,
  ownCount=defaultProps.ownCount
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
        <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>Joined {joined}</Caption>
      </View>  
      <View style={styles.footer}>
        <Text style={styles.footerText}>Joined {numeral(joinedCount).format('0a')}</Text>
        <Text style={styles.footerText}> • </Text>
        <Text style={styles.footerText}>Own {numeral(ownCount).format('0a')}</Text>
      </View>
    </View>
  </React.Fragment>
);

const defaultProps = {
  name: 'Babakolo Usman Suleiman',
  pictureUrl: null,
  joined: 'Mon 12, November 2018',
  joinedCount: 8,
  ownCount: 3
}