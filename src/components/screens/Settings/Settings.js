import React from 'react';
import { SectionList } from 'react-native';
import {
  Appbar,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Item from './Item';
import items from './items';
import snackbar from 'helpers/snackbar';

class Settings extends React.Component {
  static defaultProps = {
    stores: {}
  }

  handleValueChange = (value) => {
    switch(value) {
      case 'disablePush':
      case 'disableComments':
        this.props.stores.settingsStore.togglePref(value);
        break;
      default:
        this.props.stores.settingsStore.toggle(value);
        break;
    }
  };

  toggleTheme = () => {
    this.props.stores.settingsStore.toggleTheme();
  };

  _handleRemindMeDialog = () => {
    const { openRemindMeDialog, stores } = this.props;
    if (stores.settingsStore.disableReminders) {
      snackbar(I18n.get("TOAST_enableReminder"));
    } else {
      openRemindMeDialog();
    }
  };

  _keyExtractor = item => item.key;

  _renderItem = ({ item }) => {
    let keys = this.props.stores.settingsStore;
    switch(item.key) {
      case 'disablePush':
      case 'disableComments':
        keys = this.props.stores.settingsStore.userPreference;
        break;
    }

    return <Item
      item={item}
      value={keys[item.key]}
      handleValueChange={this.handleValueChange}
      handleRemindMeDialog={this._handleRemindMeDialog}
      color={this.props.stores.themeStore.colors.gray}
    />;
  };

  _renderSectionHeader = ({ section: { title } }) => (
    <Text style={{
      paddingTop: 16,
      paddingHorizontal:16,
      fontWeight: 'bold',
      color: this.props.stores.themeStore.colors.gray 
    }}>{I18n.get(`SETTINGS_${title}SectionTitle`)}</Text>
  );

  render() {
    const {
      goBack,
      stores,
    } = this.props;
    const { styles } = stores.appStyles;

    return (
      <>
        <Appbar style={styles.header} collapsable>
          <Appbar.Action
            onPress={goBack}
            size={24}
            color={stores.themeStore.colors.primary}
            icon={({ color, size }) => <Icon
              name="arrow-left"
              size={size}
              color={color}
            />}
          />
          <Appbar.Content
            title={I18n.get("SETTINGS_screenTitle")}
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <SectionList
          contentContainerStyle={[styles.bg, { flex: 1}]}
          sections={items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          extraData={stores.settingsStore.extraData}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Settings));