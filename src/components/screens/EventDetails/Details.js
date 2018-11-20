import React from 'react';
import Details from '../../routes/EventDetails';

export default class DetailsScreen extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  render() {
    return (
      <Details
        handleBack={this._goBack}
      />
    )
  }
}