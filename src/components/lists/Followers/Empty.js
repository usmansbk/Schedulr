import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import Error from 'components/common/Error';
import styles from './styles';

export default ({ isAuthor, error }) => {
  if (error) return <Error />
  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>
        {
          isAuthor ? "Send invites!" : "Be the first to follow!"
        }
      </Headline>
    </View>
  );
};
