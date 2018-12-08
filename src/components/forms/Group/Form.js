import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Switch,
  Appbar
} from 'react-native-paper';
import { Formik } from 'formik';
import validationSchema from './schema';
import styles, { navButtonColor } from './styles';

const defaultValues = {
  name: '',
  description: '',
  private: false,
};

const Form = ({
  initialValues,
  loading,
  handleCancel,
  onSubmit,
  isEdit,
}) => (
  <Formik
    initialValues={initialValues || defaultValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      onSubmit && onSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      isSubmitting=loading,
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      resetForm
    }) => (
      <React.Fragment>     
      <Appbar.Header style={styles.header}>
        <Button
          mode="outlined"
          color={navButtonColor}
          onPress={handleCancel}
        >Cancel</Button>
        <Button
          loading={isSubmitting}
          mode="outlined"
          color={navButtonColor}
          onPress={handleSubmit}
        >{ isEdit ? 'Save' : 'Create'}</Button>
      </Appbar.Header>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => resetForm()} />}>
        <View style={styles.form}>
          <TextInput
            placeholder="Group name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            mode="outlined"
          />
          <HelperText
            type="error"
            visible={errors.name && touched.name}
          >
          {errors.name}
          </HelperText>
          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            mode="outlined"
          />
          <HelperText
            type="error"
            visible={errors.description && touched.description}
          >
          {errors.description}
          </HelperText>
          <View style={styles.switchButton}>
            <Text style={styles.text}>Visibility</Text>
            <Switch
              value={values.private}
              onValueChange={() => setFieldValue('private', !values.private)}
            />
          </View>
          <HelperText
            type="info"
            visible={values.private}
          >
            Users won't be able to search for this group!
          </HelperText>
        </View>
      </ScrollView>
      </React.Fragment>
    )}
  </Formik>
);
export default Form;