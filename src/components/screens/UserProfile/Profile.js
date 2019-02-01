import React from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import {
  Appbar,
  Text,
  TouchableRipple
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import UserBoard from '../UserBoards';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default ({
  goBack,
  loading,
  user,
  error,
  onRefresh,
  navigateToUserBoards
}) => {
  if (loading && !user) return <Loading />;
  if (error && !user) return <Error onRefresh={onRefresh} />;

  const {
    id,
    name,
    pictureUrl,
    followingCount,
    createdCount
  } = user;
  return (
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
        <TouchableRipple onPress={() => navigateToUserBoards(id)}>
          <View style={styles.countRow}>
            <View style={styles.item}>
              <Text style={styles.label}>Following</Text>
              <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Created</Text>
              <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
            </View>
          </View>
        </TouchableRipple>
      </View>
    </View>
    <UserBoard id={id} />
  </React.Fragment>
)};
