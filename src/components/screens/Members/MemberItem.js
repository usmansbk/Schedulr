import React from 'react';
import {
  ListItem,
  Text,
  Left,
  Body,
} from 'native-base';
import UserAvatar from '../../common/UserAvatar';
import styles from './styles';

export default class MemberItem extends React.PureComponent {

  render() {
    const { name, photo } = this.props;
    return (
      <ListItem
        avatar
        noIndent
        noBorder
      >
        <Left>
          <UserAvatar rounded name={name} size={40} src={photo} />
        </Left>
        <Body>
          <Text style={styles.text}>{name}</Text>
        </Body>
      </ListItem>
    )
  }
}