import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import theme from '../../theme';

export default class Badge extends React.PureComponent {
  render() {
    const { text, danger, info, warning, success, style } = this.props;
    
    let color = null;
    if (danger) color = styles.danger;
    else if (info) color = styles.info;
    else if (warning) color = styles.warning;
    else if (success) color = styles.success;
    else color = styles.primary;
  
    return (
      <View style={[styles.container, color, style]}>
        <Text uppercase={false} style={styles.text}>{text}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 22,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    padding: 4,
    fontSize: 16,
  },
  primary: {
    backgroundColor: theme.backgroundColor
  },
  info: {
    backgroundColor: '#428bca',
  },
  danger: {
    backgroundColor: '#cc3300',
  },
  danger_light: {
    backgroundColor: '#ff9966',
  },
  warning: {
    backgroundColor: '#ffcc00',
  },
  success_light: {
    backgroundColor: '#99cc33'
  },
  success: {
    backgroundColor: '#339900'
  }
});