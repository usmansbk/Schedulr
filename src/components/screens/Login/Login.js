import React from 'react';
import {View, StatusBar, Linking, Image} from 'react-native';
import {Caption, Headline, Button} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Logo from 'components/common/Logo';
import env from 'config/env';

export default inject('stores')(
  observer((props) => {
    const signInWithGoogle = React.useCallback(() => {
      props.handleLogin('Google');
    }, [props.handleLogin]);

    const signInWithFacebook = React.useCallback(() => {
      props.handleLogin('Facebook');
    }, [props.handleLogin]);

    return (
      <View style={props.stores.styles.login.container}>
        <StatusBar
          backgroundColor={props.stores.settings.dark ? 'black' : 'white'}
          barStyle={
            props.stores.settings.dark ? 'light-content' : 'dark-content'
          }
        />
        <View style={props.stores.styles.login.content}>
          <View style={props.stores.styles.login.logo}>
            <Logo />
            <Headline
              allowFontScaling={false}
              style={props.stores.styles.login.h1}>
              {I18n.get('APP_welcome')}
            </Headline>
          </View>
          <View>
            <Button
              mode="contained"
              uppercase={false}
              loading={props.stores.appState.loggingIn === 'Facebook'}
              color={props.stores.theme.colors.facebook}
              contentStyle={props.stores.styles.login.socialButton}
              labelStyle={props.stores.styles.login.labelStyle}
              icon={() => (
                <Image
                  resizeMode="contain"
                  style={props.stores.styles.login.icon}
                  source={require('./img/facebook.png')}
                />
              )}
              onPress={signInWithFacebook}>
              {I18n.get('BUTTON_continueWithFacebook')}
            </Button>
            <Button
              mode="contained"
              uppercase={false}
              loading={props.stores.appState.loggingIn === 'Google'}
              color={props.stores.theme.colors.google}
              contentStyle={props.stores.styles.login.socialButton}
              labelStyle={props.stores.styles.login.labelStyle}
              style={props.stores.styles.login.button}
              icon={() => (
                <Image
                  resizeMode="contain"
                  style={props.stores.styles.login.icon}
                  source={require('./img/google.png')}
                />
              )}
              onPress={signInWithGoogle}>
              {I18n.get('BUTTON_continueWithGoogle')}
            </Button>
            <Button
              uppercase={false}
              contentStyle={{
                height: 48,
              }}
              style={{
                marginVertical: 8,
              }}
              onPress={() => props.handleEmailLogin()}>
              {I18n.get('BUTTON_continueWithEmail')}
            </Button>
          </View>
        </View>
        <Caption
          allowFontScaling={false}
          style={props.stores.styles.login.caption}>
          {I18n.get('APP_footerCaption')}{' '}
          <Caption
            onPress={() => Linking.openURL(env.TERMS_URL)}
            style={props.stores.styles.login.link}>
            {I18n.get('APP_TERMS')}
          </Caption>
          {I18n.get('APP_AND')}
          <Caption
            onPress={() => Linking.openURL(env.PRIVACY_URL)}
            style={props.stores.styles.login.link}>
            {I18n.get('APP_PRIVACY')}
          </Caption>
        </Caption>
      </View>
    );
  }),
);
