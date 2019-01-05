import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  List
} from 'react-native-paper';

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

  _onContinue = async () => {
    const {
      id,
      date,
      onSubmit,
      handleDismiss
    } = this.props;
    this.setState({ loading: true });
    try {
      await onSubmit({
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
      handleDismiss
    } = this.props;
    const { checked, loading } = this.state;
    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleDismiss}
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
                  title="Include future events"
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