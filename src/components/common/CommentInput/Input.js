import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import {
  IconButton,
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from "./styles";

export default ({
  name="Babakolo Usman Suleiman",
  pictureUrl,
  loading,
  content,
  handleChangeText,
  handleSubmit
}) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <UserAvatar
        rounded
        size={AVATAR_SIZE}
        src={pictureUrl}
        name={name}
        component={CachedImage}
      />
    </View>
    <View style={styles.body}>
      <TextInput
        placeholder="Add a comment..."
        value={content}
        onChangeText={handleChangeText}
      />
    </View>
    <View style={styles.right}>
      <IconButton
        icon="send"
        disabled={loading || !content}
        onPress={handleSubmit}
      />
    </View>
  </View>
)