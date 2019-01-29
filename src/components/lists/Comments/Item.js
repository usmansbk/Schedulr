import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Paragraph,
  Caption,
  Button,
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Hyperlink from 'react-native-hyperlink';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  state = {
    showOptions: false
  };
  _onLongPress = () => this.props.onLongPress(this.props.id);
  _onPress = () => this.props.onPress();
  _onReply = () => this.props.handleReplyComment(this.props.id, this.props.authorName);
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _showOptions = () => {
    if (this.props.isAuthor) {
      this.setState(prev =>({
        showOptions: !prev.showOptions
      }));
    }
  };

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
      <TouchableRipple
        onPress={this._onPress}
        onLongPress={this._onLongPress}
        style={styles.itemContainer}
      >
        <View style={styles.itemMainContent}>
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
              <Caption>{isPending ? 'pending' : timeAgo}</Caption>
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
                {
                  isAuthor && (
                    <View style={styles.actions}>
                      <Button compact mode="text" onPress={this._onReply}>REPLY</Button>
                    </View>
                  )
                }
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}