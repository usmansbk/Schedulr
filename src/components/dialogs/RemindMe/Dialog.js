import React from 'react';
import {FlatList} from 'react-native';
import {Dialog, Portal, List} from 'react-native-paper';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import items from './items';

class RemindMe extends React.Component {
  static defaultProps = {
    stores: {
      remindMeBefore: {
        fiveMin: false,
        tenMin: false,
        fifteenMin: false,
        thirtyMin: false,
        oneHour: false,
        oneDay: false,
      },
    },
  };

  _toggle = async (key) => {
    await this.props.stores.remindMeStore.toggle(key);
  };

  _keyExtractor = (item) => item.key;

  _renderItem = ({item}) => {
    const {stores} = this.props;
    return (
      <List.Item
        title={I18n.get(`REMIND_ME_${item.text}`)}
        right={() => (
          <Switch
            value={stores.remindMeStore[item.key]}
            onValueChange={() => this._toggle(item.key)}
          />
        )}
        onPress={() => this._toggle(item.key)}
      />
    );
  };

  render() {
    const {stores, visible, hideDialog} = this.props;

    const {colors} = stores.theme;

    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={hideDialog}
          style={{backgroundColor: colors.bg}}>
          <Dialog.Title>{I18n.get('REMIND_ME_title')}</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={items}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              extraData={stores.remindMeStore.extraData}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{I18n.get('BUTTON_done')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default inject('stores')(observer(RemindMe));
