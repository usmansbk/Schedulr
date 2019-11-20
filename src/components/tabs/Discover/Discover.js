import React from 'react';
import { inject, observer } from 'mobx-react';
import List from './ListHoc';
import LocationInput from 'components/common/LocationInput';

class Discover extends React.Component {
  state = {
    showLocationPicker: false
  };

  _openLocationPicker = () => this.setState({ showLocationPicker: true });
  _hideLocationPicker = () => this.setState({ showLocationPicker: false });
  
  componentDidMount = () => {
    this.props.stores.locationStore.fetchLocation(true);
  };

  _handleSelect = (location) => this.props.stores.locationStore.setSearchLocation(location);

  render() {
    return (
      <>
      <List
        city={this.props.stores.locationStore.locality || 'Global'}
        category={this.props.stores.appState.discoverFilter}
        location={this.props.stores.locationStore.point}
        onPressLocationButton={this._openLocationPicker}
      />
      <LocationInput
        visible={this.state.showLocationPicker}
        hideModal={this._hideLocationPicker}
        onSelect={this._handleSelect}
      />
      </>
    );
  }
} 

export default inject("stores")(observer(Discover));