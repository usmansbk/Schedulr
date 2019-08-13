import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  Checkbox,
  List
} from 'react-native-paper';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import { SINGLE_EVENT, ALL_EVENTS } from 'lib/constants';

class CancelEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: Boolean(props.date) ? SINGLE_EVENT : ALL_EVENTS,
      loading: false,
      date: props.date || null
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextProps.date !== this.props.date ||
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading
  );

  static getDerivedStateFromProps(props, state) {
    const { date } = props;
    if (date !== state.date) {
      return {
        checked: Boolean(date) ? SINGLE_EVENT : ALL_EVENTS,
        date: date
      };
    }
    return null;
  }

  _onContinue = () => {
    const {
      id,
      date,
      onSubmit,
      handleDismiss,
    } = this.props;
    this.setState({ loading: true });
    onSubmit({
      id,
      option: this.state.checked,
      date: date ? moment(date).valueOf() : null
    }).catch(() => {});
    handleDismiss();
    this.setState({ loading: false });
  }

  render() {
    const {
      date,
      visible,
      handleDismiss,
      stores
    } = this.props;
    const { checked, loading } = this.state;
    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleDismiss}
          style={{backgroundColor: stores.themeStore.colors.bg}}
        >
          <Dialog.Title>{I18n.get("DIALOG_cancelEvent")}</Dialog.Title>
          {
            Boolean(date) && (
              <Dialog.Content>
                <List.Item
                  title={I18n.get("DIALOG_onlyThisEvent")}
                  right={() => (
                    <Checkbox
                      value={SINGLE_EVENT}
                      status={ checked === SINGLE_EVENT ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: SINGLE_EVENT })}
                    />
                  )}
                />
                <List.Item
                  title={I18n.get("DIALOG_allOfThisEvent")}
                  right={() => (
                    <Checkbox
                      value={ALL_EVENTS}
                      status={ checked === ALL_EVENTS ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: ALL_EVENTS})}
                    />
                  )}
                />
              </Dialog.Content>
            )
          }
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button disabled={loading} loading={loading} onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(CancelEvent));