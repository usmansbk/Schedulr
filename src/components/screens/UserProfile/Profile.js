import React from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import {
  Appbar,
  Text,
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
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
  onRefresh
}) => {
  if (loading && !user) return <Loading />;
  if (error && !user) return <Error onRefresh={onRefresh} />;

  const {
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
      <Text
        style={styles.headline}
      >
        {name}
      </Text>
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
    </View>
)};
