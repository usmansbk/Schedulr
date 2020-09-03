import React from 'react';
import {View, ScrollView} from 'react-native';
import isEqual from 'lodash.isequal';
import {Text, Appbar, Caption} from 'react-native-paper';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import Alert from 'components/dialogs/Alert';
import LocationPicker from 'components/common/LocationPicker';
import {PickerInput, CustomPicker} from 'components/common/Picker';
import {Formik} from 'formik';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Suspense from 'components/common/Suspense';
import schema from './schema';

class Form extends React.Component {
  static defaultProps = {
    initialValues: {
      name: '',
      description: '',
      location: null,
      isPublic: true,
      topic: '',
    },
  };

  _alertRef = (ref) => (this.alertRef = ref);

  state = {
    showInfoAlert: false,
    showLocationPicker: false,
    display: false,
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
    setTimeout(this.props.stores.location.fetchLocation, 0);
  };

  _showInfoAlert = () => this.alertRef.open();
  _hideDialog = () => {
    this.setState({
      showInfoAlert: false,
      showLocationPicker: false,
    });
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {initialValues, handleCancel, onSubmit, edit, stores} = this.props;

    initialValues.location = initialValues.location
      ? initialValues.location
      : stores.location.location;
    const styles = stores.styles.scheduleForm;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          values.geo_point = stores.location.point;
          const castVal = schema.cast(values);
          onSubmit && onSubmit(castVal);
        }}>
        {({
          values,
          errors,
          isSubmitting,
          submitForm,
          handleChange,
          handleBlur,
          setFieldValue,
          initialValues,
          isValid,
        }) => (
          <>
            <Appbar.Header style={styles.header} collapsable>
              <Button danger onPress={handleCancel}>
                {I18n.get('BUTTON_cancel')}
              </Button>
              <Button
                loading={isSubmitting}
                disabled={
                  !isValid || isSubmitting || isEqual(initialValues, values)
                }
                onPress={submitForm}>
                {edit ? I18n.get('BUTTON_save') : I18n.get('BUTTON_create')}
              </Button>
            </Appbar.Header>
            <ScrollView
              style={styles.container}
              keyboardShouldPersistTaps="always">
              <View style={styles.form}>
                <TextInput
                  bold
                  label={I18n.get('SCHEDULE_FORM_name')}
                  placeholder={I18n.get('PLACEHOLDER_name')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  autoFocus
                />
                <View style={{paddingHorizontal: 8}}>
                  <Text style={[styles.text, {marginVertical: 4}]}>
                    {I18n.get('SCHEDULE_FORM_topic')}
                  </Text>
                  <CustomPicker
                    value={values.topic}
                    prompt={I18n.get('SCHEDULE_FORM_selectTopic')}
                    data={I18n.get('topics')}
                    onValueChange={handleChange('topic')}
                  />
                  <View style={{marginVertical: 12}}>
                    <Switch
                      textStyle={styles.text}
                      label={I18n.get('SCHEDULE_FORM_public')}
                      value={values.isPublic}
                      onValueChange={() => {
                        setFieldValue('isPublic', !values.isPublic);
                      }}
                    />
                  </View>
                  <View style={{marginVertical: 12}}>
                    <Text style={styles.text}>
                      {I18n.get('SCHEDULE_FORM_location')}
                    </Text>
                    <PickerInput
                      value={values.location}
                      onPress={() => this.setState({showLocationPicker: true})}
                    />
                  </View>
                </View>
                <TextInput
                  label={I18n.get('SCHEDULE_FORM_description')}
                  placeholder={I18n.get('PLACEHOLDER_description')}
                  value={values.description}
                  multiline
                  maxHeight={120}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                />
                <View style={styles.info}>
                  <Caption style={styles.primary} onPress={this._showInfoAlert}>
                    {I18n.get('SCHEDULE_whatIsASchedule')}
                  </Caption>
                </View>
              </View>
            </ScrollView>
            <LocationPicker
              visible={this.state.showLocationPicker}
              hideModal={this._hideDialog}
              onSelect={handleChange('location')}
            />
            <Alert
              title={I18n.get('ALERT_whatIsASchedule')}
              message={I18n.get('ALERT_whatIsAScheduleA')}
              ref={this._alertRef}
              alert
            />
          </>
        )}
      </Formik>
    );
  }
}

export default inject('stores')(observer(Form));
