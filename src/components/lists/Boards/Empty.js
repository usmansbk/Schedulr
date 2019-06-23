import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ profile, error, stores }) => {
    let title = "Your board is empty";
    let caption = "Follow or create a schedule";
    if (profile) {
      title = "No schedule";
      caption = "";
    }
    if (error) {
      title = "Network error";
      caption = "Check your internet connection";
    }

    const styles = stores.appStyles.boardsList;
  
    return (
      <View style={styles.empty}>
        <Headline style={styles.emptyTitle}>{title}</Headline>
        <Paragraph>{caption}</Paragraph>
      </View>
    );
  }
));
