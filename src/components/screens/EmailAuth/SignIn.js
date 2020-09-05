import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n, Auth} from 'aws-amplify';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, Headline, Button} from 'react-native-paper';
import {TextField as TextInput} from 'components/common/TextInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Icon from 'components/common/Icon';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(I18n.get('HELPER_TEXT_emailRequired')),
  password: Yup.string().required(I18n.get('HELPER_TEXT_passwordRequired')),
});

function SignIn(props) {
  const passwordRef = React.useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (input, actions) => {
      try {
        props.stores.appState.setLoginState('Email');
        await Auth.signIn(input.email, input.password);
      } catch (error) {
        console.log(error);
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
        <Headline>{I18n.get('TITLE_login')}</Headline>
        <TextInput
          label={I18n.get('LABEL_email')}
          placeholder={I18n.get('PLACEHOLDER_email')}
          style={styles.field}
          returnKeyType="next"
          autoCompleteType="email"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
          error={formik.touched.email && formik.errors.email}
        />
        <TextInput
          ref={passwordRef}
          label={I18n.get('LABEL_password')}
          placeholder={I18n.get('PLACEHOLDER_password')}
          style={styles.field}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <View style={styles.row}>
          <Button
            uppercase={false}
            onPress={() =>
              props.navigation.navigate('Confirm', {
                email: formik.values.email,
              })
            }
            style={styles.field}
            contentStyle={styles.button}>
            {I18n.get('BUTTON_verify')}
          </Button>
          <Button
            uppercase={false}
            onPress={() =>
              props.navigation.navigate('ForgotPassword', {
                email: formik.values.email,
              })
            }
            style={styles.field}
            contentStyle={styles.button}>
            {I18n.get('BUTTON_forgotPassword')}
          </Button>
        </View>
        <Button
          disabled={formik.isSubmitting}
          loading={
            formik.isSubmitting || props.stores.appState.loggingIn === 'Email'
          }
          onPress={formik.handleSubmit}
          uppercase={false}
          style={styles.field}
          mode="contained"
          labelStyle={styles.label}
          contentStyle={styles.button}>
          {I18n.get('BUTTON_login')}
        </Button>
        <Button
          onPress={() => props.navigation.navigate('SignUp')}
          uppercase={false}
          style={styles.field}
          contentStyle={styles.button}>
          {I18n.get('BUTTON_createAccount')}
        </Button>
      </ScrollView>
    </>
  );
}

export default inject('stores')(observer(SignIn));
