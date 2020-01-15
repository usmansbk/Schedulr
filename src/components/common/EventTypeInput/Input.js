import React from 'react';
import {
  Modal,
  Portal,
  HelperText,
  Provider,
  Divider,
  IconButton,
} from 'react-native-paper';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Alert from 'components/dialogs/Alert';
import List from './List';

const MAX_LENGTH = 30;
const MIN_LENGTH = 2

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      showDeleteAlert: false,
      text: props.selectedValue,
      selectedValue: props.selectedValue
    }
  }

  _onConfirmAlert = () => {
    this.props.stores.appState.removeCustomType(this.state.id);
    this._hideAlertModal();
   };

  _hideAlertModal = () => this.setState({
    id: null,
    showDeleteAlert: false
  });

  _onLongPressItem = (id) => this.setState({
    id,
    showDeleteAlert: true
  });

  static getDerivedStateFromProps(props, state) {
    if (props.selectedValue !== state.selectedValue) {
      return {
        selectedValue: props.selectedValue,
        text: props.selectedValue
      };
    }
    return null;
  }

  _clearText = () => this.setState({ text: '' });
  _hideModal = () => this.props.hideModal();
  _onChangeText = text => this.setState({ text });
  _onValueChange = (value) => {
    const defaultType = I18n.get('categories')[0];
    if (value === defaultType) {
      this.props.onValueChange(null);
    } else {
      this.props.onValueChange(value);
    }
  };
  _handleSubmit = () => {
    const { text } = this.state;
    const trimmedText = text.trim();
    const length = trimmedText.length;
    if (length >= MIN_LENGTH && length <= MAX_LENGTH) {
      this._onValueChange(trimmedText);
      this.props.stores.appState.addCustomType(trimmedText);
      this.setState({ text: '' });
      this._hideModal();
    } else {
      this._onValueChange(null);
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
    const tooShort = length && (length < MIN_LENGTH);
    const tooLong = length > MAX_LENGTH;

    return (
      <>
      <Provider>
        <Portal>
          <Modal
            dismissable
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
                onLongPressItem={this._onLongPressItem}
              />
              <Divider />
              <View style={styles.textInputContainer}>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder={I18n.get("PLACEHOLDER_customType")}
                    label={I18n.get("PLACEHOLDER_customType")}
                    mode="outlined"
                    style={styles.placeholder}
                    placeholderTextColor={colors.placeholder}
                    value={text}
                    onChangeText={this._onChangeText}
                    onSubmitEditing={this._handleSubmit}
                  />
                </View>
                {
                  !!length && (
                    <IconButton
                      size={24}
                      color={colors.primary}
                      icon={({ size, color }) => <Icon
                        name="x"
                        size={size}
                        color={color}
                      />}
                      onPress={this._clearText}
                    />
                  )
                }
              </View>
              <HelperText
                type="error"
                visible={tooLong || tooShort}
              >
                { I18n.get(`HELPER_TEXT_too${tooLong ? 'Long' : 'Short'}`)}
              </HelperText>
            </View>
          </Modal>
        </Portal>
      </Provider>

      <Alert
        visible={this.state.showDeleteAlert}
        title={I18n.get("ALERT_deleteType")}
        handleDismiss={this._hideAlertModal}
        onConfirm={this._onConfirmAlert}
      />
      </>
    )
  }
}

export default inject("stores")(observer(Input));