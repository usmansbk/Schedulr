import React from 'react';
import { View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import GLoginButton from '../../social_buttons/GLoginButton';
import FBLoginButton from '../../social_buttons/FBLoginButton';
import Logo from '../../common/Logo';
import styles from './styles';

export default (props) => (
  <View style={styles.container}>
    <Logo />
    <Text style={styles.h1}>Welcome to Schdlr!</Text>
    <Caption>
      The Social Calendar
    </Caption>
    <View style={styles.content}>
      <FBLoginButton disabled={props.loading} onLogin={props.handleLogin} />
      <GLoginButton disabled={props.loading} onLogin={props.handleLogin} />
    </View>
    <Caption style={styles.caption}>
      Keep your friends and collegues up to date with the latest events!
    </Caption>
  </View>
);