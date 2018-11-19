import React from 'react';
import { View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import GLoginButton from '../../common/GLoginButton';
import FBLoginButton from '../../common/FBLoginButton';
import Logo from '../../common/Logo';
import styles from './styles';

export default (props) => (
  <View style={styles.container}>
    <Logo />
    <Text style={styles.h1}>Welcome to Schdlr</Text>
    <Caption>
      The Social Calendar
    </Caption>
    <View style={styles.content}>
      <FBLoginButton onPress={props.handleLogin} />
      <GLoginButton onPress={props.handleLogin} />
    </View>
  </View>
);