import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Paragraph,
  Caption,
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Hyperlink from 'react-native-hyperlink';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  _onDelete = () => this.props.handleDeleteComment(this.props.id);
  _onReply = () => this.props.handleReplyComment(this.props.id, this.props.authorName);
  _navigateToProfile = () => this.props.navigateToProfile(this.props.id);

  render() {
    const {
      authorName,
      content,
      timeAgo,
      replyingName,
      replyingContent,
      isAuthor,
    } = this.props;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <TouchableRipple onPress={this._navigateToProfile}>
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
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.authorName}
              onPress={this._navigateToProfile}
            >{authorName}</Text>
          </View>
          {
            Boolean(replyingContent) && (
              <View style={styles.replyBox}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.replyName}
                >{replyingName}</Text>
                <Caption numberOfLines={4} ellipsizeMode="tail">{replyingContent}</Caption>
              </View>
            )
          }
          <View style={styles.itemContent}>  
            <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
              <Paragraph style={styles.message}>
                {content}
              </Paragraph>
            </Hyperlink>
            { 
              isAuthor && (
                <View style={styles.footer}>
                  <Caption>{timeAgo}</Caption>
                  <View style={styles.actions}>
                    <Text onPress={this._onDelete} style={styles.footerText}>Delete</Text>
                    <Text onPress={this._onReply} style={styles.footerText}>Reply</Text>
                  </View>
                </View>
              )
            }
          </View>
        </View>
      </View>
    )
  }
}