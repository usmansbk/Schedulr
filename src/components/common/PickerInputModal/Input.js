import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TouchableRipple
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class Input extends React.Component {
  state = {
    visible: false
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.props.hideModal();

  render() {
    const { selectedValue, stores, visible } = this.props;
    const styles = stores.appStyles.picker;

    return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={this._hideModal}
            contentContainerStyle={styles.container}
          >
            <Button>
              Hide
            </Button>
          </Modal>
        </Portal>
      </Provider>
    )
  }
}
