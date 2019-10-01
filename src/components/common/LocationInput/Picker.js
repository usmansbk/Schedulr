import React from 'react';
import {
  Modal,
  Portal,
  IconButton
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';
import { PLACES_API_KEY } from 'config/env';

export default class Picker extends React.Component {
  _onValueChange = (value) => this.props.onValueChange(value);
  _onSelect = (data) => {
    console.log(data);
  };

  render() {
    const {
      styles,
      modalStyle,
      visible,
      hideModal,
      language,
    } = this.props;

    return (
      <Portal>
        <Modal
          dismissable
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle.container}
        >
          <GooglePlacesAutocomplete
            placeholder={I18n.get("PLACEHOLDER_searchCities")}
            minLength={2}
            autoFocus={true}
            listViewDisplayed="auto"
            returnKeyType='search'
            onPress={this._onSelect}
            query={{
              key: PLACES_API_KEY,
              language,
              types: '(cities)'
            }}
            styles={styles}
            debounce={200}
            renderLeftButton={() => <IconButton
              onPress={hideModal}
              icon={() => <Icon
                size={22}
                name="arrow-left"
              />}
            />}
          />
        </Modal>
      </Portal>
    )
  }
}