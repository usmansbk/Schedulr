import React from 'react';
import { Formik } from 'formik';
import { View, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';

const defaultValues = {
  content: '',
  replying: 2
};

export default ({
  pictureUrl,
  name,
  loading,
  handleSubmit
}) => (
  <Formik
    initialValues={defaultValues}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmit && handleSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      isSubmitting = loading,
      submitForm,
      handleChange,
      handleBlur,
      values
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
    )}
  </Formik>
);
