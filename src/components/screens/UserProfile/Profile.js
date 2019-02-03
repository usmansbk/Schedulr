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
import appStyles from '../../../config/styles';
import colors from '../../../config/colors';

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
    <Appbar.Header style={appStyles.header}>
      <Appbar.BackAction onPress={goBack} color={colors.gray} />
    </Appbar.Header><View style={styles.container}>
      <View style={styles.content}> 
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
    </View>
    </React.Fragment>
    
)};
