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
  _hideModal = () => this.setState({ visible: false });

  render() {
    const { selectedValue, stores } = this.props;
    const { visible } = this.state;
    const styles = stores.appStyles.picker;

    return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={this._hideModal}
          >

          </Modal>
        </Portal>
      </Provider>
    )
  }
}
