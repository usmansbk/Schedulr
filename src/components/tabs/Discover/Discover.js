import React from 'react';
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
    const category = this.props.stores.appState.discoverFilter;
    const city = this.props.stores.location.searchLocation;
    return (
      <>
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
