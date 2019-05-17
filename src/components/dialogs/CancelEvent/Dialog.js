import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  List
} from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class CancelEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: Boolean(props.date) ? 'SINGLE' : 'ALL',
      loading: false
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextProps.date !== this.props.date ||
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading
  );

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.date !== this.props.date) {
      this.setState({
        checked: Boolean(nextProps.date) ? 'SINGLE' : 'ALL',
      });
    }
  }

  _onContinue = () => {
    const {
      id,
      date,
      onSubmit,
      handleDismiss,
    } = this.props;
    this.setState({ loading: true });
    try {
      onSubmit({
        id,
        option: this.state.checked,
        date
      });
      handleDismiss();
    } catch (error) {
      this.setState({ loading: false });
    }
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
          <Dialog.Title>Cancel event?</Dialog.Title>
          {
            Boolean(date) && (
              <Dialog.Content>
                <List.Item
                  title="Only this event"
                  right={() => (
                    <RadioButton
                      value="SINGLE"
                      status={ checked === 'SINGLE' ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: 'SINGLE'})}
                    />
                  )}
                />
                <List.Item
                  title="All of this event"
                  right={() => (
                    <RadioButton
                      value="ALL"
                      status={ checked === 'ALL' ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: 'ALL'})}
                    />
                  )}
                />
              </Dialog.Content>
            )
          }
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button disabled={loading} loading={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}