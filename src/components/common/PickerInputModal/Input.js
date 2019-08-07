import React from 'react';
import {
  Modal,
  Portal,
  HelperText,
  Provider,
  Divider,
} from 'react-native-paper';
import { View, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import List from './List';

const MAX_LENGTH = 30;
const MIN_LENGTH = 2

class Input extends React.Component {
  state = {
    visible: false,
    text: ''
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.props.hideModal();
  _onChangeText = text => this.setState({ text });
  _onValueChange = (value) => this.props.onValueChange(value);
  _handleSubmit = () => {
    const { text } = this.state;
    const trimmedText = text.trim();
    const length = trimmedText.length;
    if (length >= MIN_LENGTH && length <= MAX_LENGTH) {
      this._onValueChange(trimmedText);
      this.props.stores.appState.addCustomType(trimmedText);
      this.setState({ text: '' });
      this._hideModal();
    }
  }
  _filterData = (data) => data.filter(item => item.toLowerCase().includes(this.state.text.toLowerCase()));

  render() {
    const {
      selectedValue,
      stores,
      visible,
    } = this.props;
    const styles = stores.appStyles.picker;
    const colors = stores.themeStore.colors;
    const { text } = this.state;
    const data = this._filterData(stores.appState.categories);

    const length = text.length;
    const tooShort = length && length < MIN_LENGTH;
    const tooLong = length > MAX_LENGTH;

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
                selectedValue={selectedValue}
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
              <HelperText
                type="error"
                visible={tooLong || tooShort}
              >
                { tooLong ? 'Too long' : 'Too short'}
              </HelperText>
            </View>
          </Modal>
        </Portal>
      </Provider>
    )
  }
}

export default inject("stores")(observer(Input));