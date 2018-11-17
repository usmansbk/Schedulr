import React from 'react';
import { Alert, ToastAndroid } from 'react-native';
import Button from '../SButton';
import theme from '../../theme';

export default class MapButton extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.location !== this.props.location;
  }
  
  _onPress = () => {
    const { location } = this.props;
    if (!location) ToastAndroid.show('No address found', ToastAndroid.SHORT);
    else Alert.alert('Address', location);
  }

  render() {
    return (
      <Button
        onPress={this._onPress}
        color={theme.bgLight}
        isClicked={this.props.location}
        name="map-pin"
        type="Feather"
        normal
      />
    );
  }
}