import React from 'react';
import {
  GoogleSignin,
} from 'react-native-google-signin';
import { Button } from 'react-native-paper';
import styles from '../../../config/styles';
import colors from '../../../config/colors';


export default class GButton extends React.Component {
  state = {
    isSigninInProgress: false
  }

  render() {
    const { loading } = this.props;
    return (
      <Button
        loading={loading}
        mode="contained"
        color={colors.google}
        style={styles.loginButton}
        onPress={this._signIn}
        disabled={loading}>
        Sign in with Google
      </Button>
    )
  }
};
