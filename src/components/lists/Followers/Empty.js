import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default ({ isAuthor }) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      {
        isAuthor ? "Send invites!" : "Be the first to follow!"
      }
    </Headline>
  </View>
);
