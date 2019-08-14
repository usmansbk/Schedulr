import React from 'react';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Button,
  TextInput,
  HelperText,
  Appbar,
} from 'react-native-paper';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import formSchema from './schema';

class Form extends React.Component {

  static defaultProps = {
    initialValues: {
      name: '',
      website: null,
    }
  }

  render() {
    const {
      initialValues,
      onSubmit,
      handleCancel,
      stores
    } = this.props;

    const styles = stores.appStyles.eventForm;
    const navButtonColor = stores.themeStore.colors.navButtonColor;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
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
          resetForm,
          initialValues,
          isValid
        }) => (
          <>
          <Appbar.Header style={styles.header}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              color={navButtonColor}
              uppercase
            >{I18n.get("BUTTON_cancel")}</Button>
            <Button
              loading={isSubmitting}
              disabled={(!isValid || isSubmitting || isEqual(initialValues, values))}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
              uppercase
            >{I18n.get("BUTTON_save")}</Button>
          </Appbar.Header>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={resetForm}
                colors={[stores.themeStore.colors.primary]}
                progressBackgroundColor={stores.themeStore.colors.bg}
              />
            }
            style={styles.container}
          >
            <View style={styles.form}>
              <TextInput
                placeholder={I18n.get("PROFILE_FORM_name")}
                label={I18n.get("PROFILE_FORM_name")}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                mode="outlined"
                autoFocus
              />
              <HelperText
                type="error"
                visible={errors.name && touched.name}
              >
              {errors.name && I18n.get(`HELPER_TEXT_${errors.name}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("PROFILE_FORM_website")}
                label={I18n.get("PROFILE_FORM_website")}
                value={values.website}
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                mode="outlined"
              />
              <HelperText
                type="error"
                visible={errors.website && touched.website}
              >
              {errors.website && I18n.get(`HELPER_TEXT_${errors.website}`)}
              </HelperText>
            </View>
          </ScrollView>
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));