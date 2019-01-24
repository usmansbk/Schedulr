import React from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import {
  Appbar,
  Text
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import { CIRCLE } from '../../../config/constants';
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
        <View style={styles.countRow}>
          <Text
            style={styles.count}
          >
            Following {numeral(followingCount).format('0a')}
          </Text>
          <Text style={styles.middot}>{` ${CIRCLE} `}</Text>
          <Text style={styles.count}>
            Created {numeral(createdCount).format('0a')}
          </Text>
        </View>
      </View>
    </View>
  </React.Fragment>
)};
