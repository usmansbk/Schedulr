import React from 'react';
import {View, ScrollView} from 'react-native';
import isEqual from 'lodash.isequal';
import {
  // Text,
  Appbar,
} from 'react-native-paper';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import {
  // CustomPicker,
  PickerInput,
} from 'components/common/Picker';
import LocationPicker from 'components/common/LocationPicker';
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

  state = {
    display: false,
    showLocationPicker: false,
  };
  _showLocationPicker = () => this.setState({showLocationPicker: true});
  _hideLocationPicker = () => this.setState({showLocationPicker: false});

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

  render() {
    if (!this.state.display) return <Suspense />;
    const {initialValues, handleCancel, onSubmit, edit, stores} = this.props;

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
                  theme={{roundness: 0, colors: {text: '#000'}}}
                />
                {/* <View style={styles.gap} />
                <Text style={[styles.text, styles.tightVerticalSpacing]}>
                  {I18n.get('SCHEDULE_FORM_topic')}
                </Text>
                <CustomPicker
                  icon="tago"
                  value={values.topic}
                  prompt={I18n.get('SCHEDULE_FORM_selectTopic')}
                  data={I18n.get('topics')}
                  onValueChange={handleChange('topic')}
                /> */}
                <View style={styles.gap} />
                <View style={styles.field}>
                  <Switch
                    textStyle={styles.text}
                    label={I18n.get('SCHEDULE_FORM_public')}
                    value={values.isPublic}
                    onValueChange={() => {
                      setFieldValue('isPublic', !values.isPublic);
                    }}
                  />
                </View>
                {values.isPublic && (
                  <>
                    <View style={styles.gap} />
                    <PickerInput
                      leftIcon="find"
                      value={values.location}
                      onPress={this._showLocationPicker}
                      placeholder={I18n.get('PLACEHOLDER_global')}
                    />
                    <View style={styles.gap} />
                  </>
                )}
                <TextInput
                  label={I18n.get('SCHEDULE_FORM_description')}
                  placeholder={I18n.get('PLACEHOLDER_description')}
                  value={values.description}
                  multiline
                  maxHeight={120}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                  theme={{roundness: 0, colors: {text: '#000'}}}
                />
              </View>
            </ScrollView>
            <LocationPicker
              visible={this.state.showLocationPicker}
              hideModal={this._hideLocationPicker}
              onSelect={handleChange('location')}
            />
          </>
        )}
      </Formik>
    );
  }
}

export default inject('stores')(observer(Form));
