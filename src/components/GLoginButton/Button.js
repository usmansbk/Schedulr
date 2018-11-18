import React from 'react';
import {
  GoogleSignin,
} from 'react-native-google-signin';
import { Button } from 'react-native-paper';
import styles from '../../config/styles';
import colors from '../../config/colors';


export default class GButton extends React.Component {
  state = {
    isSigninInProgress: false
  }

  render() {
    return (
      <Button
        mode="contained"
        color={colors.google}
        style={styles.loginButton}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}>
        Continue with Google
      </Button>
    )
  }
};
