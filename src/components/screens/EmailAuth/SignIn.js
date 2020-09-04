import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, Headline, TextInput, Button} from 'react-native-paper';
import Icon from 'components/common/Icon';

function SignIn(props) {
  const passwordRef = React.useRef(null);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const togglePassword = React.useCallback(
    () => setSecureTextEntry(!secureTextEntry),
    [secureTextEntry],
  );

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
          theme={{roundness: 0}}
          style={styles.field}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
        />
        <TextInput
          ref={passwordRef}
          label={I18n.get('LABEL_password')}
          secureTextEntry={secureTextEntry}
          placeholder={I18n.get('PLACEHOLDER_password')}
          theme={{roundness: 0}}
          style={styles.field}
        />
        <View style={styles.row}>
          <Button
            uppercase={false}
            onPress={() => props.navigation.navigate('Confirm')}
            style={styles.field}
            contentStyle={styles.button}>
            {I18n.get('BUTTON_verify')}
          </Button>
          <Button
            uppercase={false}
            onPress={() => props.navigation.navigate('ForgotPassword')}
            style={styles.field}
            contentStyle={styles.button}>
            {I18n.get('BUTTON_forgotPassword')}
          </Button>
        </View>
        <Button
          onPress={() => null}
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
