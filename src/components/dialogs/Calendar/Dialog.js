import React from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  List,
  Switch
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class CalendarDialog extends React.Component {
  state = {
    isAuthorized: false,
    calendars: []
  };

  componentDidMount = async () => {
    const isAuthorized = await this.props.stores.calendar.isAuthorized();
    let calendars = [];
    if (isAuthorized) {
      calendars = await this.props.stores.calendar.findCalendars();
    }
    this.setState({ isAuthorized, calendars });
  };

  _authorize = async () => {
    const isAuthorized = await this.props.stores.calendar.authorize();
    let calendars = [];
    if (isAuthorized) {
      calendars = await this.props.stores.calendar.findCalendars();
    }
    this.setState({ isAuthorized, calendars });
  };

  _keyExtractor = item => item.id;

  _renderItem = ({ item: calendar }) => {
    const { stores } = this.props;
    return (
      <List.Item
        titleNumberOfLines={1}
        titleEllipsizeMode="tail"
        title={calendar.title}
        right={() => (
          <Switch
            value={Boolean(stores.calendar.includes(calendar.id))}
            onValueChange={() => stores.calendar.toggleCalendar(calendar)}
          />
        )}
      />
    )
  };

  _dimiss = () => this.props.handleDismiss();
  _import = async () => {
    this.setState({ loading: true });
    await this.props.stores.calendar.fetchEvents();
    this.setState({ loading: false }, this._dimiss);
    this.props.stores.snackbar.show('Events imported');
  };

  render() {
    const {
      stores,
      visible,
    } = this.props;
    const { colors } = stores.themeStore;

    const {
      isAuthorized,
      calendars,
      loading
    } = this.state;
    
    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={this._dimiss}
          style={{backgroundColor: colors.bg}}>
          <Dialog.Title>{I18n.get("MORE_importCalendar")}</Dialog.Title>
          <Dialog.Content>
            {
              isAuthorized ? (
                <FlatList
                  data={calendars}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  extraData={stores.calendar.calendars.length}
                />
              ) : (
                <Button onPress={this._authorize}>{I18n.get("BUTTON_addMyCalendar")}</Button>
              )
            }
          </Dialog.Content>
          {
            isAuthorized && (
              <Dialog.Actions>
                <Button onPress={this._dimiss}>{I18n.get('BUTTON_dismiss')}</Button>
                <Button onPress={this._import} disabled={!stores.calendar.calendars.length} loading={loading}>{I18n.get('BUTTON_import')}</Button>
              </Dialog.Actions>
            )
          }
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(CalendarDialog));