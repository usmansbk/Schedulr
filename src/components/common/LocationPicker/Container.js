import React from 'react';
import {inject, observer} from 'mobx-react';
import Picker from './Picker';

export default inject('stores')(
  observer(({stores, visible, hideModal, onSelect}) => (
    <Picker
      hideModal={hideModal}
      visible={visible}
      location={stores.location.parsedLocation}
      styles={stores.styles.places}
      modalStyle={stores.styles.picker}
      language={stores.settings.userPreference.language}
      placeholderTextColor={stores.theme.colors.placeholder}
      iconColor={stores.theme.colors.gray}
      onSelectLocation={onSelect}
    />
  )),
);
