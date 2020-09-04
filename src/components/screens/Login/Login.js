import React from 'react';
import {View, StatusBar, Linking, Image} from 'react-native';
import {Caption, Headline, Button} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Logo from 'components/common/Logo';
import env from 'config/env';

export default inject('stores')(
  observer((props) => (
    <View style={props.stores.styles.login.container}>
      <StatusBar
        backgroundColor={props.stores.settings.dark ? 'black' : 'white'}
        barStyle={props.stores.settings.dark ? 'light-content' : 'dark-content'}
      />
      <Logo />
      <Headline allowFontScaling={false} style={props.stores.styles.login.h1}>
        {I18n.get('APP_welcome')}
      </Headline>
      <View style={props.stores.styles.login.content}>
        <View>
          <Button
            mode="contained"
            uppercase={false}
            color={props.stores.theme.colors.facebook}
            disabled={props.stores.appState.loggingIn}
            loading={props.loading}
            contentStyle={props.stores.styles.login.socialButton}
            icon={() => (
              <Image
                resizeMode="contain"
                style={props.stores.styles.login.icon}
                source={require('./img/facebook.png')}
              />
            )}
            onPress={() => props.handleLogin('facebook')}>
            {I18n.get('BUTTON_continueWithFacebook')}
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            disabled={props.stores.appState.loggingIn}
            color={props.stores.theme.colors.google}
            loading={props.loading}
            contentStyle={props.stores.styles.login.socialButton}
            style={props.stores.styles.login.button}
            icon={() => (
              <Image
                resizeMode="contain"
                style={props.stores.styles.login.icon}
                source={require('./img/google.png')}
              />
            )}
            onPress={() => props.handleLogin('google')}>
            {I18n.get('BUTTON_continueWithGoogle')}
          </Button>
          <Button
            disabled={props.stores.appState.loggingIn}
            uppercase={false}
            loading={props.loading}
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
        {' and '}
        <Caption
          onPress={() => Linking.openURL(env.PRIVACY_URL)}
          style={props.stores.styles.login.link}>
          {I18n.get('APP_PRIVACY')}
        </Caption>
      </Caption>
    </View>
  )),
);
