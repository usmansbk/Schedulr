import React from 'react';
import { View, Text } from 'react-native';
import GLoginButton from '../GLoginButton';
import FBLoginButton from '../FBLoginButton';
import styles from './styles';

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to Schdlr</Text>
      <View style={styles.content}>
        <FBLoginButton />
        <GLoginButton />
      </View>
    </View>
  );
}