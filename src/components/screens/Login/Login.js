import React from 'react';
import { View, StatusBar } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import GLoginButton from 'components/social_buttons/GLoginButton';
import FBLoginButton from 'components/social_buttons/FBLoginButton';
import Logo from 'components/common/Logo';
import colors from 'config/colors';
import styles from './styles';

export default (props) => (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary_light} barStyle="light-content"/>
      <Logo />
      <Headline style={styles.h1}>Welcome to Schdlr!</Headline>
      <Caption style={styles.caption}>
        The Event scheduler
      </Caption>
      <View style={styles.content}>
        <FBLoginButton disabled={props.loading} onLogin={props.handleLogin} />
        <GLoginButton disabled={props.loading} onLogin={props.handleLogin} />
      </View>
      <Caption style={styles.caption}>
        Share your schedules with friends and colleagues!
      </Caption>
    </View>
);