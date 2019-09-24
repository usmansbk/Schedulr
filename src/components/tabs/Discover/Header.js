import React from 'react';
import {
	View,
	Text
} from 'react-native';
import { I18n } from 'aws-amplify';

export default class Header extends React.Component {
	componentDidMount = () => {};
	
	render() {
		return (
			<View>
				<Text>{I18n.get("EXPLORE_header")}</Text>
			</View>
		);
	}
}