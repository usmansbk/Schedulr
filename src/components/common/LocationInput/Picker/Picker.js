import React from 'react';
import {
  Modal,
  Portal,
  Provider,
  Divider,
} from 'react-native-paper';
import { View, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from './List';
import PickerInput from './PickerInput';

const MAX_LENGTH = 30;
const MIN_LENGTH = 2

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      text: props.selectedValue
    }
  }

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });
  _onChangeText = text => this.setState({ text });
  _onValueChange = (value) => this.props.onValueChange(value);

  render() {
    const {
      selectedValue,
      stores,
      location
    } = this.props;
    const { visible } = this.state;
    const styles = stores.appStyles.picker;
    const colors = stores.themeStore.colors;
    const { text } = this.state;
    const data = [];

    return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={this._hideModal}
            contentContainerStyle={styles.container}
          >

            <View style={styles.content}>
              <List
                data={data}
                onValueChange={this._onValueChange}
                hideModal={this._hideModal}
              />
              <Divider />
              <TextInput
                placeholder="Custom type"
                label="Custom type"
                mode="outlined"
                style={styles.placeholder}
                placeholderTextColor={colors.placeholder}
                value={text}
                onChangeText={this._onChangeText}
                onSubmitEditing={this._handleSubmit}
              />
            </View>
          </Modal>
        </Portal>
      </Provider>
    )
  }
}

export default inject("stores")(observer(Input));