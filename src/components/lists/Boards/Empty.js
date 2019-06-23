import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ profile, error, stores }) => {
    let title = "Follow or create a schedule";
    if (profile) title = "No schedule";
    if (error) {
      title = "Network error";
    }

    const styles = stores.appStyles.boardsList;
  
    return (
      <View style={styles.empty}>
        <Headline style={styles.emptyTitle}>{title}</Headline>
      {
        error && (
          <Paragraph style={styles.paragraph}>
            Check your internet connection. Pull to refresh.
          </Paragraph>
        )
      }
      </View>
    );
  }
));
