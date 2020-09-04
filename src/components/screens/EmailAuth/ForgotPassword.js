import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n, Auth} from 'aws-amplify';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Headline, TextInput, Button, Banner} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(I18n.get('HELPER_TEXT_emailRequired')),
  password: Yup.string(),
});

function ForgotPassword(props) {
  const [banner, setBanner] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const togglePassword = React.useCallback(
    () => setSecureTextEntry(!secureTextEntry),
    [secureTextEntry],
  );
  const toggleMode = React.useCallback(() => {
    if (mode === 'Reset') {
      setMode('Forgot');
    } else {
      setMode('Reset');
    }
  }, [mode]);

  const formik = useFormik({
    initialValues: {
      email: props.navigation.getParam('email', ''),
      code: '',
      password: '',
    },
    onSubmit: async (input, actions) => {
      try {
        if (mode === 'Reset') {
          await Auth.forgotPasswordSubmit(
            input.email,
            input.code,
            input.password,
          );
          setBanner(I18n.get('BANNER_passwordChanged'));
        } else {
          await Auth.forgotPassword(input.email);
          setBanner(I18n.get('BANNER_resetSent')(input.email));
        }
        setMode('Reset');
      } catch (error) {
        let message;
        if (error.name === 'UserNotFoundException') {
          message = I18n.get('BANNER_noAccount');
        } else {
          message = error.message;
        }

        setBanner(message);
      }
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
    banner: {
      backgroundColor: props.stores.theme.colors.menuBackground,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
        contentStyle={styles.banner}
        actions={[
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
        <Headline>
          {I18n.get(
            `TITLE_${mode === 'Reset' ? 'resetPassword' : 'forgotPassword'}`,
          )}
        </Headline>
        <TextInput
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
        />
        {mode === 'Reset' ? (
          <>
            <TextInput
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
            />
            <TextInput
              label={I18n.get('LABEL_password')}
              placeholder={I18n.get('PLACEHOLDER_password')}
              theme={{
                roundness: 0,
                colors: {
                  text: '#000',
                },
              }}
              style={styles.field}
              value={formik.values.password}
              secureTextEntry={secureTextEntry}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            <View style={styles.row}>
              <Button
                uppercase={false}
                contentStyle={styles.button}
                onPress={togglePassword}>
                {I18n.get(`BUTTON_${secureTextEntry ? 'show' : 'hide'}`)}
              </Button>
            </View>
          </>
        ) : null}
        <Button
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          onPress={formik.handleSubmit}
          uppercase={false}
          style={styles.field}
          mode="contained"
          labelStyle={styles.label}
          contentStyle={styles.button}>
          {I18n.get(mode === 'Reset' ? 'BUTTON_reset' : 'BUTTON_sendLink')}
        </Button>
        <Button
          onPress={toggleMode}
          uppercase={false}
          style={styles.field}
          contentStyle={styles.button}>
          {I18n.get(
            mode === 'Reset' ? 'BUTTON_sendLink' : 'BUTTON_resetPassword',
          )}
        </Button>
      </ScrollView>
    </>
  );
}

export default inject('stores')(observer(ForgotPassword));
