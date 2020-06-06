import React from 'react';
import { FlatList } from 'react-native';
import {
  Dialog,
  Portal,
  List,
} from 'react-native-paper';
import Button from 'components/common/Button';
import RadioButton from 'components/common/RadioButton';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import items from './items';

class Theme extends React.Component {
  static defaultProps = {
    stores: {
      theme: 'light'
    }
  };

  _toggle = async (theme) => {
    await this.props.stores.settingsStore.setTheme(theme);
  };

  _keyExtractor = item => item.key;

  _renderItem = ({item}) => {
    const { stores } = this.props;
    return (
      <List.Item
        title={I18n.get(`THEME_${item.key}`)}
        right={() => (
          <RadioButton
            checked={stores.settingsStore.theme === item.key}
            onPress={() => this._toggle(item.key)}
          />
        )}
        onPress={() => this._toggle(item.key)}
      />
    );
  };

  render() {
    const {
      stores,
      visible,
      hideDialog,
    } = this.props;

    const { colors } = stores.themeStore;

    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={hideDialog}
          style={{backgroundColor: colors.bg}}
        >
          <Dialog.Title>{I18n.get("THEME_title")}</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={items}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              extraData={stores.settingsStore.theme}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{I18n.get("BUTTON_done")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(Theme));