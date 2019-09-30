import React from 'react';
import {
  Modal,
  Portal,
  Divider,
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import { View, TextInput } from 'react-native';
import List from './List';

export default class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  _onChangeText = text => this.setState({ text });
  _onValueChange = (value) => this.props.onValueChange(value);

  render() {
    const {
      style,
      placeholder,
      visible,
      hideModal
    } = this.props;
    const { text } = this.state;

    return (
      <Portal>
        <Modal
          dismissable
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={style.container}
        >
          <View style={style.content}>
            <List
              data={[]}
              onValueChange={this._onValueChange}
              hideModal={hideModal}
            />
            <Divider />
            <TextInput
              placeholder={I18n.get("PLACEHOLDER_searchCities")}
              label={I18n.get("PLACEHOLDER_searchCities")}
              mode="outlined"
              style={style.placeholder}
              placeholderTextColor={placeholder}
              value={text}
              onChangeText={this._onChangeText}
              onSubmitEditing={this._handleSubmit}
            />
          </View>
        </Modal>
      </Portal>
    )
  }
}