import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(observer(
  ({ error, loading, stores, notFound }) => {
    if (loading) return <Loading />;
    if (error || notFound) return <Error
      notFound={notFound}
      message={I18n.get("ERROR_404")}
      caption={I18n.get("ERROR_404_caption")}
    />;
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
