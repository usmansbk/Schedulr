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
  
  componentDidMount = async () => await this.props.stores.locationStore.fetchLocation(true);

  _handleSelect = (location) => this.props.stores.locationStore.setSearchLocation(location);

  render() {
    return (
      <>
      <List
        location={this.props.stores.locationStore.point}
        onPressLocationButton={this._openLocationPicker}
      />
      <LocationInput
        visible={this.state.showLocationPicker}
        location={this.props.stores.locationStore.location}
        hideModal={this._hideLocationPicker}
        language={this.props.stores.settingsStore.language}
        styles={this.props.stores.appStyles.places}
        modalStyle={this.props.stores.appStyles.picker}
        onSelectLocation={this._handleSelect}
      />
      </>
    );
  }
} 

export default inject("stores")(observer(Discover));