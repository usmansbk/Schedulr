import React from 'react';
import { View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import GLoginButton from '../../social_buttons/GLoginButton';
import FBLoginButton from '../../social_buttons/FBLoginButton';
import Logo from '../../common/Logo';
import colors from '../../../config/colors';
import styles from './styles';

export default (props) => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor={colors.primary_dark}
      barStyle="light-content"
    />
    <Logo />
    <Text style={styles.h1}>Welcome to Schdlr!</Text>
    <Caption>
      The Social Calendar
    </Caption>
    <View style={styles.content}>
      <FBLoginButton onPress={props.handleLogin} />
      <GLoginButton onPress={props.handleLogin} />
    </View>
    <Caption style={styles.caption}>
      Keep your friends and collegues up to date with the latest events!
    </Caption>
  </View>
);