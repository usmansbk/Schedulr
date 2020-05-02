import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(observer(
  ({ error, loading, stores }) => {
    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
      <View style={stores.appStyles.commentsList.empty}>
        <Image
          resizeMode="contain"
          style={{ width: 200, height: 200 }}
          source={require('../../../assets/support-woman.png')}
        />
        <Headline style={stores.appStyles.commentsList.emptyTitle}>
          {I18n.get("COMMENTS_emptyList")}
        </Headline>
      </View>
    )
}));
