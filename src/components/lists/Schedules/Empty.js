import React from 'react';
import {View, Image} from 'react-native';
import {Headline, Caption} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import {inject, observer} from 'mobx-react';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(
  observer(({profile, error, stores, onRefresh, loading}) => {
    if (loading) return <Loading />;
    if (error) return <Error onRefresh={onRefresh} />;

    let title = I18n.get('BOARD_emptyList');
    let caption = I18n.get('BOARD_emptyListCaption');
    if (profile) {
      title = I18n.get('PROFILE_boardEmptyList');
      caption = '';
    }

    const styles = stores.styles.schedulesList;

    return (
      <View style={styles.empty}>
        <Image
          resizeMode="contain"
          style={{width: 200, height: 200}}
          source={require('../../../assets/list-app.png')}
        />
        <Headline style={styles.emptyTitle}>{title}</Headline>
        <Caption>{caption}</Caption>
      </View>
    );
  }),
);
