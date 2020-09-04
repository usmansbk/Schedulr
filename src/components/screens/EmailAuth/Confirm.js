import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Headline, TextInput, Button} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  code: Yup.number().required('Code required'),
});
function Confirm(props) {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: (input, actions) => {
      console.log(input);
      actions.setSubmitting(false);
    },
    validationSchema,
  });

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: props.stores.theme.colors.bg,
      padding: 16,
    },
    field: {
      marginVertical: 8,
    },
    button: {
      height: 48,
    },
    label: {
      color: 'white',
      fontFamily: 'SemiBold',
    },
  });

  return (
    <>
      <Appbar.Header style={props.stores.styles.appStyles.header}>
        <Appbar.Action
          onPress={() => props.navigation.goBack()}
          animated={false}
          icon={({size, color}) => (
            <Icon size={size} color={color} name="arrow-left" />
          )}
        />
      </Appbar.Header>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}>
        <Headline>{I18n.get('TITLE_code')}</Headline>
        <TextInput
          label={I18n.get('LABEL_code')}
          placeholder={I18n.get('PLACEHOLDER_code')}
          theme={{roundness: 0}}
          style={styles.field}
          value={formik.values.code}
          onChangeText={formik.handleChange('code')}
          onBlur={formik.handleBlur('code')}
          error={formik.touched.code && formik.errors.code}
        />
        <Button
          loading={formik.isSubmitting}
          onPress={formik.handleSubmit}
          uppercase={false}
          style={styles.field}
          mode="contained"
          labelStyle={styles.label}
          contentStyle={styles.button}>
          {I18n.get('BUTTON_confirm')}
        </Button>
        <Button
          onPress={() => null}
          uppercase={false}
          style={styles.field}
          contentStyle={styles.button}>
          {I18n.get('BUTTON_sendCode')}
        </Button>
      </ScrollView>
    </>
  );
}

export default inject('stores')(observer(Confirm));
