import React, { PureComponent } from 'react';
import {
  ListItem,
  Left,
  Body,
  Text,
} from 'native-base';

export default class SettingsItem extends PureComponent {
  _handlePress = () => this.props.handlePress(this.props.id)

  render() {
    const {
      name,
      icon,
      note
    } = this.props;

    return (
      <ListItem
        style={{
          paddingVertical: 8
        }}
        avatar
        button
        onPress={this._handlePress}
      >
        <Left>
          { icon }
        </Left>
        <Body>
          <Text>{name}</Text>
          {
            Boolean(note) && <Text note>{note}</Text>
          }
        </Body>
      </ListItem>
    )
  }
}