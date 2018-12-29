import React from 'react';
import { Formik } from 'formik';
import { View, TextInput } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';

export default ({
  pictureUrl,
  name="...",
  replying,
  targetName,
  handleSubmit,
  cancelReply
}) => (
  <Formik
    initialValues={{
      content: '',
      replying,
    }}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmit && handleSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      isSubmitting,
      submitForm,
      handleChange,
      handleBlur,
      values
    }) => (
      <React.Fragment>
        {
          Boolean(replying) && (
            <View style={styles.alert}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.alertTitle}
              >Replying <Text style={styles.targetName}>{targetName}</Text>
            </Text>
              <Text onPress={cancelReply} style={styles.cancelText}>Cancel</Text>
            </View>
          )
        }
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
            value={values.content}
            onChangeText={handleChange('content')}
            onBlur={handleBlur('content')}
          />
        </View>
        <View style={styles.right}>
          <IconButton
            icon="send"
            disabled={isSubmitting || !values.content}
            onPress={submitForm}
          />
        </View>
      </View>
      </React.Fragment>
    )}
  </Formik>
);
