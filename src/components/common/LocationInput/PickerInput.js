import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';

export default inject("stores")(observer(({ stores, location, onPress, placeholder }) => (
	<TouchableRipple style={stores.appStyles.locationInput.inputContainer} onPress={onPress}>	
		<View style={stores.appStyles.locationInput.input}>
			<Icon
				name="map-pin"
				size={18}
				style={stores.appStyles.locationInput.icon}
				color={stores.themeStore.colors.gray}
			/>
			<Text>{location || placeholder}</Text>
		</View>
	</TouchableRipple>
)));
