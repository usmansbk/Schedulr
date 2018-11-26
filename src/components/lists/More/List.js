import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Share from 'react-native-share';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import items from './items';
import styles from './styles';
import env from '../../../config/env';

class List extends React.Component {
  _onPressItem = (id) => {
    const { navigation } = this.props;
    switch(id) {
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'help':
        navigation.navigate('Help');
        break;
      case 'invite':
        const url = env.DOWNLOAD_URL;
        const message = "Hey there... I use Schdlr to share and follow events with friends and collegues";
        const options = {
          title: 'Invite via...',
          message,
          subject: 'The Social Calendar',
          url
        }
        Share.open(options);
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
      id,
      name,
      icon,
    }
  }) => (
    <Item
      id={id}
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