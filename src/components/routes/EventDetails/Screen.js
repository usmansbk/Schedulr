import React from 'react';
import { Appbar } from 'react-native-paper';
import Details from './Details';

export default class Screen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.handleBack} />
          <Appbar.Content title="Details" />
          <Appbar.Action
            icon="share"
          />
          <Appbar.Action
            icon="delete"
          />
          <Appbar.Action
            icon="more-vert"
          />
        </Appbar.Header>
        <Details />
      </React.Fragment>
    )
  }
}