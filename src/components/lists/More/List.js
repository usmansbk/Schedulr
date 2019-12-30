import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import LogoutDialog from 'components/dialogs/Logout';
import SyncDialog from 'components/dialogs/Sync';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import items from './items';
import { shareApp } from 'helpers/share';

class List extends React.Component {
  state = {
    visible: false,
    showSyncAlert: false,
    showImportDialog: false
  };
  _openDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({
    visible: false,
    showSyncAlert: false,
    showImportDialog: false
  });
  _onPressHeader = () => {
    const id = this.props.stores.appState.userId;
    this.props.navigation.navigate('UserProfile', {
      id,
      myProfile: true
    });
  };
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
        shareApp();
        break;
      case 'sync':
        this.setState({ showSyncAlert: true });
        break;
      case 'import-calendar':
        this.setState({ showImportDialog: true });
        break;
      default:
        break;
    }
  };
  _keyExtractor = (item) => item.id;
  _renderHeader = () => <Header onPress={this._onPressHeader} />;
  _renderFooter = () => <Footer openDialog={this._openDialog} />;
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
      name={I18n.get(`MORE_${name}`)}
      icon={icon}
      onPressItem={this._onPressItem}
    />
  );
  // shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  render() {
    const { moreList } = this.props.stores.appStyles;
    const styles = moreList
    return (
      <>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderHeader}
        />
        <LogoutDialog
          visible={this.state.visible}
          handleDismiss={this._hideDialog}
          onConfirm={this._hideDialog}
        />
        <SyncDialog
          id={this.props.stores.appState.userId}
          visible={this.state.showSyncAlert}
          handleDismiss={this._hideDialog}
          onConfirm={this._hideDialog}
        />
      </>
    );
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);