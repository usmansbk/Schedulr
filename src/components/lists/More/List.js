import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import items from './items';
import styles from './styles';

class List extends React.Component {
  _onPressItem = (id) => {
    const { navigation } = this.props;
    switch(id) {
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'legal':
        navigation.navigate('Legal');
        break;
      case 'help':
        navigation.navigate('Help');
        break;
      case 'invite':
        break;
      default:
        break;
    }
  };
  _keyExtractor = (item) => item.id;
  _renderHeader = () => <Header />;
  _renderFooter = () => <Footer />;
  _renderSeparator = () => <Separator />;
  _renderItem = ({
    item: {
      name,
      icon,
    }
  }) => (
    <Item
      name={name}
      icon={icon}
      onPressItem={this._onPressItem}
    />
  );
  shouldComponentUpdate = () => this.props.isFocused;

  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}

export default withNavigationFocus(List);