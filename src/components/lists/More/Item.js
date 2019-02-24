import React from 'react';
import { List } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import styles, { black } from './styles';

@inject('stores')
@observer
export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  render() {
    const {
      id,
      name,
      icon,
    } = this.props;
    const title = id === 'theme' ? `${this.props.stores.settingsStore.theme} mode` : name
    return (
      <List.Item
        title={title}
        left={() => <List.Icon color={black} icon={icon} />}
        onPress={this._onPress}
        style={styles.item}
      />
    );
  }
}