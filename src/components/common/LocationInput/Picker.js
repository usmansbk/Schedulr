import React from 'react';
import {
  Modal,
  Portal,
  IconButton
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import GeoDBCitiesSearch from 'components/common/GeoDBCitiesSearch';
import Icon from 'react-native-vector-icons/Feather';
import { GEODB_API_KEY } from 'config/env';

export default class Picker extends React.Component {
  _onValueChange = (value) => this.props.onValueChange(value);
  _onSelect = ({ city, country }) => {
    this.props.onSelectLocation && this.props.onSelectLocation(`${city}, ${country}`);
    this.props.hideModal();
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
          <GeoDBCitiesSearch
            placeholder={I18n.get("PLACEHOLDER_searchCities")}
            onPress={this._onSelect}
            emptyListImagePlaceholder={require('../../../assets/map.png')}
            query={{
              key: GEODB_API_KEY,
              language
            }}
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