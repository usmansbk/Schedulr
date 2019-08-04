import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
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

    let title = "Your schedule is empty";
    let caption = "Follow or create a schedule";
    if (profile) {
      title = "No schedule";
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
