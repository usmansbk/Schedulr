import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import ErrorScreen from 'components/common/Error';

export default inject('stores')(observer(
  ({ profile, error, stores, onRefresh, loading }) => {
    if (error) {
      return <ErrorScreen
        onRefresh={onRefresh}
        loading={loading}
      />;
    }

    let title = I18n.get("BOARD_emptyList");
    let caption = I18n.get("BOARD_emptyListCaption");
    if (profile) {
      title = I18n.get("PROFILE_boardEmptyList");
      caption = "";
    }

    const styles = stores.appStyles.schedulesList;
  
    return (
      <View style={styles.empty}>
        <Headline style={styles.emptyTitle}>{title}</Headline>
        <Caption>{caption}</Caption>
      </View>
    );
  }
));
