import React from 'react';
import { View, Image } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Loading from 'components/common/Loading';

export default inject('stores')(observer(
  ({ stores, loading }) => {
    if (loading) return <Loading loading={loading} />;
    return (
    <View style={stores.appStyles.notifications.empty}>
      <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/reading-corner.png')} />
      <Headline style={stores.appStyles.notifications.emptyTitle}>{I18n.get("NOTIFICATIONS_emptyUpdatesList")}</Headline>
      <Caption style={stores.appStyles.notifications.paragraph}>{I18n.get("NOTIFICATIONS_emptyUpdatesListCaption")}</Caption>
    </View>
  )}
));
