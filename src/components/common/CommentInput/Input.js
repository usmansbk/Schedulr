import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import {
  IconButton,
} from 'react-native-paper';
import styles from "./styles";

export default ({
  loading,
  content,
  handleChangeText,
  handleSubmit
}) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <TextInput
        placeholder="Add a comment..."
        value={content}
        onChangeText={handleChangeText}
      />
    </View>
    <View style={styles.right}>
      <IconButton
        icon="send"
        disabled={loading}
        onPress={handleSubmit}
      />
    </View>
  </View>
)