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
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);

  render() {
    const {
      id,
      authorName,
      content,
      timeAgo,
      isAuthor,
      toCommentAuthorName,
      toCommentContent,
      isToCommentDeleted
    } = this.props;

    const isPending = id[0] === '-';

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
            isToCommentDeleted ? (
              <View style={styles.replyBox}>
                <Caption style={styles.replyName}>Replying to deleted comment</Caption>
              </View>
            ) : (
            <React.Fragment>{
              Boolean(toCommentContent) && (
                <View style={styles.replyBox}>
                  <Caption
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.replyName}
                  >{toCommentAuthorName}</Caption>
                  <Caption numberOfLines={4} ellipsizeMode="tail">{toCommentContent}</Caption>
                </View>
              )}
            </React.Fragment>)
          }
          <View style={styles.itemContent}>  
            <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
              <Paragraph style={styles.message}>
                {content}
              </Paragraph>
            </Hyperlink>
            <View style={styles.footer}>
              <Caption>{isPending ? 'pending' : timeAgo}</Caption>
              {
                isAuthor && (
                  <View style={styles.actions}>
                    <Caption onPress={this._onDelete} style={styles.footerText}>Delete</Caption>
                    <Caption onPress={this._onReply} style={styles.footerText}>Reply</Caption>
                  </View>
                )
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}