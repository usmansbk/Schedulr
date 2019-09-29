import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import isEqual from 'lodash.isequal';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Switch,
  Appbar,
  Caption
} from 'react-native-paper';
import Alert from 'components/dialogs/Alert';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import validationSchema from './schema';
import buildForm from 'helpers/buildForm';

class Form extends React.Component {
  static defaultProps = {
    initialValues: {
      name: '',
      description: '',
      location: null,
      isPublic: true,
    }
  };

  state = {
    showInfoAlert: false,
    showPrivacyAlert: false
  };
  
  componentDidMount = () => {
    this.fetchLocation = setTimeout(this.props.stores.locationStore.fetchLocation, 200);
  };

  componentWillUnmount = () => clearTimeout(this.fetchLocation);

  _showInfoAlert = () => this.setState({ showInfoAlert: true });
  _showPrivacyAlert = () => this.setState({ showPrivacyAlert: true });
  _hideDialog = () => {
    this.setState({
      showInfoAlert: false,
      showPrivacyAlert: false
    });
  };

  render() {
    const {
      initialValues,
      handleCancel,
      onSubmit,
      edit,
      stores
    } = this.props;

    const styles = stores.appStyles.scheduleForm;
    const navButtonColor = stores.themeStore.colors.primary;
    
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const input = buildForm(values);
          onSubmit && await onSubmit(input);
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
              color={navButtonColor}
              onPress={handleCancel}
              uppercase
            >{I18n.get("BUTTON_cancel")}</Button>
            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || isEqual(initialValues, values)}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
              uppercase
            >{ edit ? I18n.get("BUTTON_save") : I18n.get("BUTTON_create")}</Button>
          </Appbar.Header>
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => resetForm()}
                colors={[stores.themeStore.colors.primary]}
                progressBackgroundColor={stores.themeStore.colors.bg}
              />
            }>
            <View style={styles.form}>
              <TextInput
                placeholder={I18n.get("SCHEDULE_FORM_name")}
                label={I18n.get("SCHEDULE_FORM_name")}
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
                placeholder={I18n.get("SCHEDULE_FORM_description")}
                label={I18n.get("SCHEDULE_FORM_description")}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                mode="outlined"
              />
              <HelperText
                type="error"
                visible={errors.description && touched.description}
              >
              {errors.description && I18n.get(`HELPER_TEXT_${errors.description}`)}
              </HelperText>
              <View style={styles.switchButton}>
                <Text style={styles.text}>{I18n.get("SCHEDULE_FORM_public")}</Text>
                <Switch
                  value={values.isPublic}
                  onValueChange={() => {
                    const isPublic = values.isPublic;
                    if (isPublic) this._showPrivacyAlert();
                    setFieldValue('isPublic', !isPublic);
                  }}
                />
              </View>
              <View style={styles.info}>
                <Caption style={styles.primary} onPress={this._showInfoAlert}>{I18n.get("SCHEDULE_whatIsASchedule")}</Caption>
              </View>
            </View>
          </ScrollView>
          <Alert
            title={I18n.get("ALERT_whatIsASchedule")}
            message={I18n.get("ALERT_whatIsAScheduleA")}
            visible={this.state.showInfoAlert}
            handleDismiss={this._hideDialog}
          />
          <Alert
            title={I18n.get("ALERT_privateSchedule")}
            message={I18n.get("ALERT_privateScheduleWarn")}
            visible={this.state.showPrivacyAlert}
            handleDismiss={this._hideDialog}
          />
          </>
        )}
      </Formik>
    );
  }
}

export default inject("stores")(observer(Form));