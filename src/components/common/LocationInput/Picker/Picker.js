import React from 'react';
import {
  Modal,
  Portal,
  Provider,
  Divider,
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import { View, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import List from './List';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  _onChangeText = text => this.setState({ text });
  _onValueChange = (value) => this.props.onValueChange(value);

  render() {
    const {
      stores,
      visible,
      hideModal
    } = this.props;
    const { text } = this.state;

    return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={stores.appStyles.picker.container}
          >
            <View style={stores.appStyles.picker.content}>
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
                style={stores.appStyles.picker.placeholder}
                placeholderTextColor={stores.themeStore.colors.placeholder}
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