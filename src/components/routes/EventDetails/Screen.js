import React from 'react';
import { Appbar } from 'react-native-paper';
import Details from './Details';

export default class Screen extends React.Component {
  _handleDelete = () => console.log('Delete');
  _handleEdit = () => console.log('Edit');
  _handleRepeat = () => console.log('Repeat');
  _handleCancel = () => console.log('Cancel');

  render() {
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.handleBack} />
          <Appbar.Content />
          <Appbar.Action
            icon="delete"
            onPress={this._handleDelete}
          />
          <Appbar.Action
            icon="repeat"
            onPress={this._handleRepeat}
          />
          <Appbar.Action
            icon="mode-edit"
            onPress={this._handleEdit}
          />
          <Appbar.Action
            icon="close"
            onPress={this._handleCancel}
          />
        </Appbar.Header>
        <Details />
      </React.Fragment>
    )
  }
}