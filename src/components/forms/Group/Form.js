import React from 'react';
import { View, ScrollView } from 'react-native';
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
import styles from './styles';

const defaultValues = {
  name: '',
  description: '',
  link: '',
  private: false,
};

const Form = props => {
  const {
    initialValues,
    loading,
    handleCancel,
    handleSubmit
  } = props;
  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        //   handleSubmit && handleSubmit(values);
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
        setFieldValue
      }) => (
        <React.Fragment>     
        <Appbar.Header style={styles.header}>
          <Button
            mode="outlined"
            onPress={handleCancel}
          >Cancel</Button>
          <Button
            loading={isSubmitting}
            mode="outlined"
            onPress={handleSubmit}
          >Create</Button>
        </Appbar.Header>
        <ScrollView>
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
            <TextInput
              placeholder="Link"
              value={values.link}
              onChangeText={handleChange('link')}
              onBlur={handleBlur('link')}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={errors.link && touched.link}
            >
            {errors.link}
            </HelperText>
            <View style={styles.switchButton}>
              <Text style={styles.text}>Private</Text>
              <Switch
                value={values.private}
                onValueChange={() => setFieldValue('private', !values.private)}
              />
            </View>
            <HelperText
              type="info"
              visible={values.private}
            >
              Users won't be able to find this group!
            </HelperText>
          </View>
        </ScrollView>
        </React.Fragment>
      )}
    </Formik>
  )
};

export default Form;