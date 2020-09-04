import React from 'react';
import {observer, inject} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Headline, TextInput, Button} from 'react-native-paper';
import Icon from 'components/common/Icon';

function SignUp(props) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

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
        />
        <TextInput
          ref={passwordRef}
          label={I18n.get('LABEL_password')}
          secureTextEntry
          placeholder={I18n.get('PLACEHOLDER_password')}
          theme={{roundness: 0}}
          style={styles.field}
        />
        <Button
          onPress={() => null}
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
