import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Paragraph,
  Caption
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Hyperlink from 'react-native-hyperlink';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  render() {
    const {
      authorName,
      content,
      timeAgo
    } = this.props;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <TouchableRipple>
            <UserAvatar
              name={authorName}
              component={CachedImage}
              rounded
              size={AVATAR_SIZE}
            />
          </TouchableRipple>
        </View>
        <View style={styles.itemRight}>
          <View style={styles.itemHeader}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorName}>{authorName}</Text>
            <Caption style={styles.timeAgo}>{timeAgo}</Caption>
          </View>
          <View style={styles.itemContent}>  
            <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
              <Paragraph style={styles.message}>
                {content}
              </Paragraph>
            </Hyperlink>
          </View>
        </View>
      </View>
    )
  }
}