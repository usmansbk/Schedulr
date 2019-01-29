import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default ({ profile }) => {
  let title = "Follow a board or create a new one";
  if (profile) title = "No boards";

  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>{title}</Headline>
    </View>
  );
};
