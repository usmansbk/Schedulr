import React from 'react';
import { List } from 'react-native-paper';
import styles from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  render() {
    const {
      name,
      icon,
    } = this.props;
    return (
      <List.Item
        title={name}
        left={() => <List.Icon icon={icon} />}
        onPress={this._onPress}
        style={styles.item}
      />
    );
  }
}