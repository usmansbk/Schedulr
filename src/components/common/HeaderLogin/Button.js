import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Text,
  Button,
} from 'native-base';
import Logo from '../../../containers/CommunityLogo';
import i18n from '../../../config/i18n';

const LargeLoginButton = ({ onPress }) => {
  return (
    <View style={{marginBottom: 8 }}>
      <View style={styles.body}>
        <Logo />
        <Text style={styles.message}>
          {i18n.t('auth.message')}
        </Text>
      </View>
      <Button
        bordered
        rounded
        onPress={onPress}
        style={styles.button}
      >
        <Text uppercase={false} style={styles.text}>{i18n.t('auth.sign_in')}</Text>
      </Button>
    </View>
  )
}

export default LargeLoginButton;

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 8,
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14
  },
  message: {
    textAlign: 'center',
    color: '#404040'
  },
  icon: {
    fontSize: 80,
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center'
  }
})