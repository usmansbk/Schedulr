import React from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import {
  Appbar,
  Text,
  Headline,
  TouchableRipple,
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles, { AVATAR_SIZE } from './styles';

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
    <View style={styles.header}> 
      <UserAvatar
        name={name}
        src={pictureUrl}
        rounded
        size={AVATAR_SIZE}
        component={CachedImage}
      />
      <Headline style={styles.headline}>{name}</Headline>
      <TouchableRipple onPress={() => navigateToUserBoards(id)}>
        <View style={styles.countRow}>
          <View style={styles.item}>
            <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
            <Text style={styles.label}>Following</Text>
          </View>
            <View style={styles.item}>
              <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
              <Text style={styles.label}>Created</Text>
            </View>
        </View>
      </TouchableRipple>
    </View>
)};
