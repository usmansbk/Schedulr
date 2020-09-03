import React from 'react';
import {View, StatusBar} from 'react-native';
import {Caption, Headline, ActivityIndicator} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import GLoginButton from 'components/social_buttons/GLoginButton';
import FBLoginButton from 'components/social_buttons/FBLoginButton';
import EmailLoginButton from 'components/social_buttons/EmailLoginButton';
import Logo from 'components/common/Logo';

export default inject('stores')(
  observer((props) => (
    <View style={props.stores.appStyles.login.container}>
      <StatusBar
        backgroundColor={props.stores.settingsStore.dark ? 'black' : 'white'}
        barStyle={
          props.stores.settingsStore.dark ? 'light-content' : 'dark-content'
        }
      />
      <Logo />
      <Headline
        allowFontScaling={false}
        style={props.stores.appStyles.login.h1}>
        {I18n.get('APP_welcome')}
      </Headline>
      <View style={props.stores.appStyles.login.content}>
        {props.stores.appState.loggingIn ? (
          <ActivityIndicator animating />
        ) : (
          <>
            <FBLoginButton
              disabled={props.loading}
              onLogin={props.handleLogin}
            />
            <GLoginButton
              disabled={props.loading}
              onLogin={props.handleLogin}
            />
            <EmailLoginButton onLogin={props.handleEmailLogin} />
          </>
        )}
      </View>
      <Caption
        allowFontScaling={false}
        style={props.stores.appStyles.login.caption}>
        {I18n.get('APP_footerCaption')}
      </Caption>
    </View>
  )),
);
