import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import SimpleToast from 'react-native-simple-toast';
import isEqual from 'lodash.isequal';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Switch,
  Appbar,
  Divider,
  Checkbox
} from 'react-native-paper';
import { Formik } from 'formik';
import validationSchema from './schema';
import styles, { navButtonColor } from './styles';
import { requestLocationPermission } from '../../../helpers/permissions';
import { buildBoardForm } from '../../../helpers/buildForm';

export default class Form extends React.Component {
  state = {
    longitude: null,
    latitude: null
  };

  static defaultProps = {
    initialValues: {
      name: '',
      description: '',
      isPublic: true,
      location: {
        latitude: null,
        longitude: null,
      }
    }
  };

  _tagLocation = () => {
    const { latitude, longitude } = this.state;
    if (latitude && longitude) {
      this.setState({ latitude: null, longitude: null });
    } else {
      this.getLocation();
    }
  }
  
  getLocation = () => {
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: {
              longitude,
              latitude
            }
          } = position;
          this.setState({
            latitude,
            longitude
          });
        },
        (error) => {
          SimpleToast.show(error.message, SimpleToast.SHORT);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      )
    }
  };

  render() {
    const {
      initialValues,
      handleCancel,
      onSubmit,
      edit,
    } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const input = buildBoardForm (values, this.state);
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
          <React.Fragment>     
          <Appbar.Header style={styles.header}>
            <Button
              mode="outlined"
              color={navButtonColor}
              onPress={handleCancel}
            >Cancel</Button>
            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || isEqual(initialValues, values)}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
            >{ edit ? 'Save' : 'Create'}</Button>
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
                <Text style={styles.text}>Private</Text>
                <Switch
                  value={!values.isPublic}
                  onValueChange={() => setFieldValue('isPublic', !values.isPublic)}
                />
              </View>
              {
                (!values.isPublic) && (  
                  <HelperText
                    type="info"
                    visible={!values.isPublic}
                  >
                    Invites only.
                  </HelperText>
                )
              }
              <Divider />
              <View style={styles.checkbox}>
                <Text style={styles.text}>Tag current location</Text>
                <Checkbox
                  status={(this.state.latitude && this.state.longitude) ? 'checked' : 'unchecked'}
                  onPress={this._tagLocation}
                />
              </View>
              <HelperText
                type="info"
                visible
              >
                Helps nearby users find your board and events.
              </HelperText>
            </View>
          </ScrollView>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}