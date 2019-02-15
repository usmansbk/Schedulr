import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Paragraph,
  Caption,
  Button,
  IconButton
} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import UserAvatar from '../../common/UserAvatar';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';

export default class Item extends React.PureComponent {
  state = {
    showOptions: false
  };
  _onReply = () => this.props.handleReplyComment(this.props.id, this.props.authorName);
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _onDelete = () => this.props.onDelete(this.props.id);
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
      authorPictureUrl,
      toCommentAuthorName,
      toCommentContent,
      isToCommentDeleted
    } = this.props;

    const isPending = id[0] === '-';
    const [ first, second ] = authorName.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <UserAvatar
            name={avatarName}
            src={authorPictureUrl}
            size={AVATAR_SIZE}
            onPress={this._navigateToProfile}
          />
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
            <View style={styles.actions}>
              {isAuthor && <IconButton color={colors.light_red} icon="delete" onPress={this._onDelete} />}
              <IconButton color={colors.primary} icon="reply" onPress={this._onReply}/>
            </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}