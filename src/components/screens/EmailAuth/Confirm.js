import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n, Auth} from 'aws-amplify';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Headline, TextInput, Button, Banner} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email required'),
  code: Yup.number().required('Code required'),
});

function Confirm(props) {
  const codeRef = React.useRef(null);
  const [banner, setBanner] = React.useState(null);
  const [resending, setSending] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: props.navigation.getParam('email', ''),
      code: '',
    },
    onSubmit: async (input, actions) => {
      try {
        await Auth.confirmSignUp(input.email, input.code);
        setBanner('User confirmed');
      } catch (error) {
        setBanner(error.message);
      }
      actions.setSubmitting(false);
    },
    validationSchema,
  });

  const resend = React.useCallback(async () => {
    try {
      setSending(true);
      await Auth.resendSignUp(formik.values.email);
      setBanner('Code resent successfully');
    } catch (error) {
      setBanner(error.message);
    }
    setSending(false);
  }, [formik.values.email]);

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
      <Banner
        visible={!!banner}
        actions={[
          {
            label: 'Login',
            onPress: () => props.navigation.navigate('EmailLogin'),
          },
          {
            label: 'Dismiss',
            onPress: () => setBanner(null),
          },
        ]}>
        {banner}
      </Banner>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}>
        <Headline>{I18n.get('TITLE_code')}</Headline>
        <TextInput
          autoFocus
          label={I18n.get('LABEL_email')}
          placeholder={I18n.get('PLACEHOLDER_email')}
          theme={{
            roundness: 0,
            colors: {
              text: '#000',
            },
          }}
          style={styles.field}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.touched.email && formik.errors.email}
          blurOnSubmit={false}
          onSubmitEditing={() => codeRef.current.focus()}
          returnKeyType="next"
        />
        <TextInput
          ref={codeRef}
          label={I18n.get('LABEL_code')}
          placeholder={I18n.get('PLACEHOLDER_code')}
          theme={{
            roundness: 0,
            colors: {
              text: '#000',
            },
          }}
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
          disabled={!formik.values.email}
          loading={resending}
          onPress={resend}
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
