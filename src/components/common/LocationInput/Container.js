import React from 'react';
import { inject, observer } from 'mobx-react';
import Picker from './Picker';

export default inject("stores")(observer(({
  stores,
  location,
  visible,
  hideModal,
  onSelect
}) => (
  <Picker
    hideModal={hideModal}
    visible={visible}
    location={location}
    styles={stores.appStyles.places}
    modalStyle={stores.appStyles.picker}
    language={stores.settingsStore.language}
    onSelectLocation={onSelect}
  />
)));