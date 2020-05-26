import React from 'react';
import { List } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'components/common/Icon';

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
    const color = stores.themeStore.colors.gray;

    return (
      <List.Item
        title={name}
        left={() => <List.Icon
          icon={() => <Icon
            size={24}
            name={icon}
            color={color}
          />}
        />}
        onPress={this._onPress}
        style={styles.item}
      />
    );
  }
}

export default inject("stores")(observer(Item));