import React from 'react';
import { View, StatusBar } from 'react-native';
import { Caption, Headline, ActivityIndicator } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import GLoginButton from 'components/social_buttons/GLoginButton';
import FBLoginButton from 'components/social_buttons/FBLoginButton';
import Logo from 'components/common/Logo';
import styles from './styles';

export default inject("stores")(observer((props) => (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
      <Logo />
      <Headline style={styles.h1}>Welcome to Schdlr!</Headline>
      <Caption style={styles.caption}>
        The event scheduler
      </Caption>
      <View style={styles.content}>
        {
          props.stores.appState.loggingIn ? <ActivityIndicator animating /> : (
          <>
            <FBLoginButton disabled={props.loading} onLogin={props.handleLogin} />
            <GLoginButton disabled={props.loading} onLogin={props.handleLogin} />
          </>
          )
        }
      </View>
      <Caption style={styles.caption}>
        Share your schedules!
      </Caption>
    </View>
)));