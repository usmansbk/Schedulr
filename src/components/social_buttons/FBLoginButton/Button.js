import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class FButton extends React.Component {
  render() {
    const { loading, onPress } = this.props;
    return (
      <Button
        loading={loading}
        mode="contained"
        color={colors.facebook}
        style={styles.loginButton}
        disabled={loading}
        onPress={onPress}
      >
        Continue with Facebook
      </Button>
    )
  }
}
