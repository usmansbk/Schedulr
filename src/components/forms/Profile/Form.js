import React from 'react';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  Button,
  TextInput,
  HelperText,
  Appbar,
} from 'react-native-paper';
import { Formik } from 'formik';
import Suspense from 'components/common/Suspense';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import schema  from './schema';

class Form extends React.Component {
  state = {
    display: false,
  };

  static defaultProps = {
    initialValues: {
      name: '',
      website: null,
      bio: null,
    }
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  render() {
    if (!this.state.display) return <Suspense />;

    const {
      initialValues,
      onSubmit,
      handleCancel,
      stores
    } = this.props;

    const styles = stores.appStyles.eventForm;
    const navButtonColor = stores.themeStore.colors.primary;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const castVal = schema.cast(values);
          onSubmit && await onSubmit(castVal);
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
            style={styles.container}
          >
            <View style={styles.form}>
              <TextInput
                placeholder={I18n.get("PROFILE_FORM_name")}
                label={I18n.get("PROFILE_FORM_name")}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoFocus
                underlineColor="transparent"
                style={styles.textInput}
                theme={{roundness: 0}}
              />
              <HelperText
                type="error"
                visible={errors.name && touched.name}
              >
              {errors.name && I18n.get(`HELPER_TEXT_${errors.name}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_addYourWebsite")}
                label={I18n.get("PROFILE_FORM_website")}
                value={values.website}
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                underlineColor="transparent"
                theme={{roundness: 0}}
                style={styles.textInput}
              />
              <HelperText
                type="error"
                visible={errors.website && touched.website}
              >
              {errors.website && I18n.get(`HELPER_TEXT_${errors.website}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_bio")}
                label={I18n.get("PROFILE_FORM_bio")}
                value={values.bio}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                underlineColor="transparent"
                theme={{roundness: 0}}
                style={styles.textInput}
                multiline
                maxHeight={200}
              />
              <HelperText
                type="error"
                visible={errors.bio && touched.bio}
              >
              {errors.bio && I18n.get(`HELPER_TEXT_${errors.bio}`)}
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