import React from 'react';
import {FlatList} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import LogoutDialog from 'components/dialogs/Logout';
import SyncDialog from 'components/dialogs/Sync';
import CalendarDialog from 'components/dialogs/Calendar';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import items from './items';
import {shareApp} from 'helpers/share';

class List extends React.Component {
  state = {
    showImportDialog: false,
  };

  _syncRef = (ref) => (this.syncRef = ref);
  _logoutRef = (ref) => (this.logoutRef = ref);
  _logout = () => this.logoutRef.getWrappedInstance().open();

  _hideDialog = () =>
    this.setState({
      showImportDialog: false,
    });
  _onPressHeader = () => {
    const id = this.props.stores.appState.userId;
    this.props.navigation.navigate('UserProfile', {
      id,
      myProfile: true,
    });
  };
  _onPressItem = (id) => {
    const {navigation} = this.props;
    switch (id) {
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
        this.syncRef.getWrappedInstance().open();
        break;
      case 'import-calendar':
        this.setState({showImportDialog: true});
        break;
      default:
        break;
    }
  };
  _keyExtractor = (item) => item.id;
  _renderHeader = () => <Header onPress={this._onPressHeader} />;
  _renderFooter = () => <Footer openDialog={this._logout} />;
  _renderSeparator = () => <Separator />;
  _renderItem = ({item: {id, name, icon}}) => (
    <Item
      id={id}
      name={I18n.get(`MORE_${name}`)}
      icon={icon}
      onPressItem={this._onPressItem}
    />
  );

  render() {
    const {moreList} = this.props.stores.styles;
    const styles = moreList;
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
        <LogoutDialog onConfirm={this._hideDialog} onRef={this._logoutRef} />
        <CalendarDialog
          visible={this.state.showImportDialog}
          handleDismiss={this._hideDialog}
          onConfirm={this._hideDialog}
        />
        <SyncDialog
          id={this.props.stores.appState.userId}
          onConfirm={this._hideDialog}
          ref={this._syncRef}
        />
      </>
    );
  }
}

const withStores = inject('stores')(observer(List));

export default withNavigationFocus(withStores);
