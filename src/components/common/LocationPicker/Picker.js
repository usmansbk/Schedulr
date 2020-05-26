import React from 'react';
import {
  Modal,
  Portal,
  IconButton
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import GeoDBCitiesSearch from 'react-native-geodb';
import Icon from 'components/common/Icon';
import colors from 'config/colors';
import env from 'config/env';

export default class Picker extends React.Component {
  _onValueChange = (value) => this.props.onValueChange(value);
  _onSelect = (data) => {
    const { city, country, latitude, longitude } = data;
    const point = {
      lat: latitude,
      lng: longitude
    };
    this.props.onSelectLocation && this.props.onSelectLocation(`${city}, ${country}`, point);
    this.props.hideModal();
  };

  render() {
    const {
      styles,
      modalStyle,
      placeholderTextColor,
      visible,
      hideModal,
      language,
      location,
      iconColor,
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
            placeholderTextColor={placeholderTextColor}
            onSelectItem={this._onSelect}
            emptyListImagePlaceholder={require('../../../assets/map.png')}
            query={{
              key: env.GEODB_API_KEY
            }}
            params={{
              languageCode: language,
              location,
              radius: '2000',
              distanceUnit: 'KM'
            }}
            renderLeftButton={() => <IconButton
              onPress={hideModal}
              color={iconColor}
              size={22}
              icon={({ color, size}) => <Icon
                name="arrow-left"
                color={color}
                size={size}
              />}
            />}
            styles={styles}
            colors={[colors.primary]}
            hidePoweredBy
            showActivityIndicator
          />
        </Modal>
      </Portal>
    )
  }
}