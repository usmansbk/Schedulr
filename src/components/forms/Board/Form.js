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
  isPublic: true,
};

const Form = ({
  initialValues,
  handleCancel,
  onSubmit,
  isEdit,
}) => (
  <Formik
    initialValues={initialValues || defaultValues}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting }) => {
      onSubmit && await onSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      isSubmitting,
      submitForm,
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
          onPress={submitForm}
        >{ isEdit ? 'Save' : 'Create'}</Button>
      </Appbar.Header>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => resetForm()} />}>
        <View style={styles.form}>
          <TextInput
            placeholder="Board name"
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
            <Text style={styles.text}>Public</Text>
            <Switch
              value={values.isPublic}
              onValueChange={() => setFieldValue('isPublic', !values.isPublic)}
            />
          </View>
          <HelperText
            type="info"
            visible={!values.isPublic}
          >
            Users won't be able to search for this board!
          </HelperText>
        </View>
      </ScrollView>
      </React.Fragment>
    )}
  </Formik>
);
export default Form;