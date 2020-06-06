import React from 'react';
import { FlatList } from 'react-native';
import {
  Dialog,
  Portal,
  List,
} from 'react-native-paper';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import snackbar from 'helpers/snackbar';

class CalendarDialog extends React.Component {

  _authorize = async () => {
    await this.props.stores.calendar.authorize();
  };

  _keyExtractor = item => item.id;

  _renderFooter = () => <Button onPress={this._authorize}>{I18n.get("BUTTON_addMyCalendar")}</Button>;

  _renderItem = ({ item: calendar }) => {
    const { stores } = this.props;
    return (
      <List.Item
        titleNumberOfLines={1}
        titleEllipsizeMode="tail"
        title={calendar.title}
        description={calendar.source}
        right={() => (
          <Switch
            value={Boolean(stores.calendar.includes(calendar.id))}
            onValueChange={() => stores.calendar.toggleCalendar(calendar)}
          />
        )}
      />
    );
  };

  _dimiss = () => this.props.handleDismiss();
  _import = async () => {
    this.setState({ loading: true });
    snackbar(I18n.get('SYNC_importingEvents'));
    this._dimiss();
    await this.props.stores.calendar.fetchEvents();
    snackbar(I18n.get('SYNC_importingComplete'));
    this.setState({ loading: false }, this._dimiss);
  };

  render() {
    const {
      stores,
      visible,
    } = this.props;
    const { colors } = stores.themeStore;
    const allCalendars = stores.calendar.allCalendars;
    
    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={this._dimiss}
          style={{backgroundColor: colors.bg}}>
          <Dialog.Title>{I18n.get("MORE_importCalendar")}</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={allCalendars}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              extraData={stores.calendar.calendars.length}
              ListFooterComponent={allCalendars.length ? undefined : this._renderFooter}
            />
          </Dialog.Content>
          {
            Boolean(allCalendars.length) && (
              <Dialog.Actions>
                <Button danger onPress={this._dimiss}>{I18n.get('BUTTON_dismiss')}</Button>
                <Button onPress={this._import}>{I18n.get('BUTTON_import')}</Button>
              </Dialog.Actions>
            )
          }
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(CalendarDialog));