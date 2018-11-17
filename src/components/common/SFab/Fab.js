import React from 'react';
import { StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import theme from '../../theme';

export default class SFab extends React.PureComponent {
  render() {
    const {
      name,
      onPress
    } = this.props;
    return (
      <Fab
        position="bottomRight"
        onPress={onPress}
        style={styles.fab}
      >
        <Icon type="Feather" name={name} />
      </Fab>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: theme.backgroundColor
  }
})