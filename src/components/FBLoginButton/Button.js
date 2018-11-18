import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../../config/styles';
import colors from '../../config/colors';

export default class FButton extends React.Component {
  render() {
    return (
      <Button
        mode="contained"
        color={colors.facebook}
        style={styles.loginButton}
      >
        Continue with Facebook
      </Button>
    )
  }
}
