import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import List from './ListHoc';
import LocationPicker from 'components/common/LocationPicker';

class Discover extends React.Component {
  state = {
    showLocationPicker: false,
  };

  _openLocationPicker = () => this.setState({showLocationPicker: true});
  _hideLocationPicker = () => this.setState({showLocationPicker: false});

  componentDidMount = () => {
    this.props.stores.location.fetchLocation();
  };

  _handleSelect = (location, point) => {
    this.props.stores.location.setSearchLocation(location);
    this.props.stores.location.setCurrentLocation(point);
  };

  render() {
    // const location = this.props.stores.location.point;
    const {stores, navigation} = this.props;
    const category = stores.appState.discoverFilter;
    const city = stores.location.searchLocation;
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: stores.theme.colors.bg,
            }}>
            <Searchbar
              icon={({size, color}) => (
                <Icon name="search" size={size} color={color} />
              )}
              iconColor={stores.theme.colors.primary}
              editable={false}
              collapsable
              placeholder={I18n.get('SEARCH_inputPlaceholder')(
                stores.location.searchLocation,
              )}
              theme={{roundness: 0}}
              style={{
                backgroundColor: stores.theme.colors.bg,
                elevation: 0,
                flex: 1,
              }}
            />
          </View>
        </TouchableOpacity>
        <List
          city={city}
          category={category || ''}
          // location={location}
          onPressLocationButton={this._openLocationPicker}
        />
        <LocationPicker
          visible={this.state.showLocationPicker}
          hideModal={this._hideLocationPicker}
          onSelect={this._handleSelect}
        />
      </>
    );
  }
}

export default inject('stores')(observer(Discover));
