import React from 'react';
import { View, Text } from 'react-native';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(({ stores }) => (
	<View>
		<Text>{I18n.get("DISCOVER_header")}</Text>
		<Text>{stores.locationStores.location}</Text>
	</View>
)));