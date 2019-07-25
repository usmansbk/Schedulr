import React from 'react';
import { List } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  shouldComponentUpdate = () => false;
  
  render() {
    const {
      name,
      icon,
      stores,
    } = this.props;
    const styles = stores.appStyles.moreList;
    const black = stores.themeStore.colors.black;

    return (
      <List.Item
        title={name}
        left={() => <List.Icon color={black} icon={icon} />}
        onPress={this._onPress}
        style={styles.item}
      />
    );
  }
}

export default inject("stores")(observer(Item));