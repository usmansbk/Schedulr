import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  InteractionManager,
  Alert
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
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import validationSchema from './schema';
import { buildBoardForm } from 'helpers/buildForm';
import { WHAT_IS_A_BOARD, PRIVATE_INFO } from 'lib/constants';

@inject('stores')
@observer
export default class Form extends React.Component {
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

  _showInfo = () => {
    Alert.alert('What is a board?', WHAT_IS_A_BOARD);
  };

  _aboutPrivacy = () => {
    Alert.alert("Private board", PRIVATE_INFO, [
      { text: "Don't show again", onPress: () => null },
      { text: 'Ok', onPress: () => null }
    ]);
  };

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(this.props.stores.appState.getLocation);
  };

  render() {
    const {
      initialValues,
      handleCancel,
      onSubmit,
      edit,
      stores
    } = this.props;

    const styles = stores.appStyles.boardForm;
    const navButtonColor = stores.themeStore.colors.navButtonColor;
    
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const input = buildBoardForm (values, stores.appState.location);
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
            >Cancel</Button>
            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || isEqual(initialValues, values)}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
            >{ edit ? 'Save' : 'Create'}</Button>
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
                placeholder="Event board name"
                label="Name"
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
                label="Description"
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
                  onValueChange={() => {
                    const privacy = !values.isPublic;
                    setFieldValue('isPublic', privacy);
                    if (!privacy) this._aboutPrivacy();
                  }}
                />
              </View>
              <View style={styles.info}>
                <Caption style={styles.primary} onPress={this._showInfo}>What is a board?</Caption>
              </View>
            </View>
          </ScrollView>
          </>
        )}
      </Formik>
    );
  }
}