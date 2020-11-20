import React from 'react';
import {View, ScrollView} from 'react-native';
import isEqual from 'lodash.isequal';
import {Appbar} from 'react-native-paper';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import {Formik} from 'formik';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Suspense from 'components/common/Suspense';
import schema from './schema';
import LocationPicker from 'components/common/LocationPicker';
import PickerInput from 'components/common/Picker/Input';

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
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
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
                <TextInput
                  label={I18n.get('SCHEDULE_FORM_description')}
                  placeholder={I18n.get('PLACEHOLDER_description')}
                  value={values.description}
                  multiline
                  numberOfLines={3}
                  maxHeight={120}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                  theme={{roundness: 0, colors: {text: '#000'}}}
                />
                <View style={styles.field}>
                  <Switch
                    textStyle={styles.text}
                    label={I18n.get('SCHEDULE_FORM_public')}
                    value={values.isPublic}
                    onValueChange={(val) => {
                      setFieldValue('isPublic', val);
                    }}
                  />
                </View>
                {values.isPublic && (
                  <>
                    <View style={styles.field}>
                      <PickerInput
                        leftIcon="enviroment"
                        value={values.location}
                        placeholder={stores.location.locality}
                        onPress={this._showLocationPicker}
                      />
                    </View>
                    <LocationPicker
                      hideModal={this._hideLocationPicker}
                      visible={this.state.showLocationPicker}
                      onSelect={({city, country}) => {
                        setFieldValue('location', `${city}, ${country}`);
                      }}
                    />
                  </>
                )}
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    );
  }
}

export default inject('stores')(observer(Form));
