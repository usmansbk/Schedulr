import React from 'react';
import { View, Text } from 'react-native';
import { I18n } from 'aws-amplify';

export default ({ location }) => (
	<View>
		<Text>{I18n.get("DISCOVER_header")}</Text>
		<Text>{location}</Text>
	</View>
);