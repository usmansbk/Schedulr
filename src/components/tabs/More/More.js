import React from 'react';
import List from '../../lists/More';

export default (props) => (
    <List
      navigateToSettings={() => props.navigation.navigate('Settings')}
    />
);
