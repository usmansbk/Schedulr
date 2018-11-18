import React from 'react';
import { View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import GLoginButton from '../GLoginButton';
import FBLoginButton from '../FBLoginButton';
import Logo from '../common/Logo';
import styles from './styles';

export default () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.h1}>Welcome to Schdlr</Text>
      <Caption>
        The Social Calendar
      </Caption>
      <View style={styles.content}>
        <FBLoginButton />
        <GLoginButton />
      </View>
    </View>
  );
}