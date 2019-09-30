import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';

export default inject("stores")(observer(({ stores, location, onPress }) => (
	<TouchableRipple style={stores.appStyles.locationInput.inputContainer} onPress={onPress}>	
		<View style={stores.appStyles.locationInput.input}>
			<Icon
				name="map-pin"
				size={24}
				style={stores.appStyles.locationInput.icon}
				color={stores.themeStore.colors.gray}
			/>
			<Text>{location}</Text>
		</View>
	</TouchableRipple>
)));
