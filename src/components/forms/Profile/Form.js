import React from 'react';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import { Formik } from 'formik';
import Suspense from 'components/common/Suspense';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
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
              danger
              onPress={handleCancel}
            >{I18n.get("BUTTON_cancel")}</Button>
            <Button
              loading={isSubmitting}
              disabled={(!isValid || isSubmitting || isEqual(initialValues, values))}
              onPress={submitForm}
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
                error={errors.name && touched.name}
                autoFocus
                bold
              />
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_addYourWebsite")}
                label={I18n.get("PROFILE_FORM_website")}
                value={values.website}
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                error={errors.website && touched.website}
              />
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_bio")}
                label={I18n.get("PROFILE_FORM_bio")}
                value={values.bio}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                multiline
                maxHeight={200}
                error={errors.bio && touched.bio}
              />
            </View>
          </ScrollView>
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));