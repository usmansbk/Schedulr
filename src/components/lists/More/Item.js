import React from 'react';
import { List } from 'react-native-paper';
import styles from './styles';

export default class Item extends React.PureComponent {
  render() {
    const {
      name,
      icon,
      onPress
    } = this.props;
    return (
      <List.Item
        title={name}
        left={() => <List.Icon icon={icon} />}
        onPress={onPress}
        style={styles.item}
      />
    );
  }
}