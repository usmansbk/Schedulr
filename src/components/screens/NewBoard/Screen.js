import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import Geolocation from 'react-native-geolocation-service';
import Form from '../../forms/Board';
import { requestLocationPermission } from '../../../helpers/permissions';

export default class NewBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    try {
      const result = await this.props.onSubmit(input);
      this.props.navigation.replace('BoardEvents', {
        id: result.data.createBoard.id
      });
    } catch(error) {
      SimpleToast.show('Failed to create', SimpleToast.SHORT);
      console.log(error);
    }
  };
  componentDidMount = () => {
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: {
              longitude,
              latitude
            }
          } = position;
          alert(`Latitude: ${latitude} - Longitude: ${longitude}`);
        },
        (error) => {
          alert(error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      )
    }
  };

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}