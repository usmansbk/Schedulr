import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Appbar,
  Headline,
  TextInput,
  Button,
  HelperText,
  Banner,
} from 'react-native-paper';
import {Auth} from 'aws-amplify';
import Icon from 'components/common/Icon';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name required'),
  email: Yup.string().email().required('Email required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

function SignUp(props) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [banner, setBanner] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (input, actions) => {
      try {
        await Auth.signUp({
          username: input.email,
          password: input.password,
          attributes: {
            name: input.name,
          },
        });
        props.navigation.navigate('Confirm');
      } catch (error) {
        console.log(error);
        setBanner(error.message);
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
          {label: I18n.get('BUTTON_dismiss'), onPress: () => setBanner(null)},
        ]}>
        {banner}
      </Banner>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}>
        <Headline>{I18n.get('TITLE_signup')}</Headline>
        <TextInput
          autoFocus
          label={I18n.get('LABEL_name')}
          placeholder={I18n.get('PLACEHOLDER_name')}
          theme={{roundness: 0}}
          style={styles.field}
          blurOnSubmit={false}
          onSubmitEditing={() => emailRef.current.focus()}
          returnKeyType="next"
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
          onChangeText={formik.handleChange('name')}
          error={formik.touched.name && formik.errors.name}
        />
        <TextInput
          ref={emailRef}
          label={I18n.get('LABEL_email')}
          placeholder={I18n.get('PLACEHOLDER_email')}
          theme={{roundness: 0}}
          style={styles.field}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current.focus()}
          returnKeyType="next"
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
          error={formik.touched.email && formik.errors.email}
        />
        <TextInput
          ref={passwordRef}
          label={I18n.get('LABEL_password')}
          secureTextEntry
          placeholder={I18n.get('PLACEHOLDER_password')}
          theme={{roundness: 0}}
          style={styles.field}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <HelperText visible={formik.touched.password && formik.errors.password}>
          {formik.errors.password}
        </HelperText>
        <Button
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          onPress={formik.handleSubmit}
          uppercase={false}
          style={styles.field}
          mode="contained"
          labelStyle={styles.label}
          contentStyle={styles.button}>
          {I18n.get('BUTTON_signup')}
        </Button>
      </ScrollView>
    </>
  );
}

export default inject('stores')(observer(SignUp));
