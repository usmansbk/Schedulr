import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Paragraph,
  Caption,
  IconButton
} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react/native';
import UserAvatar from 'components/common/UserAvatar';
import { comments_list } from 'lib/constants';

const { AVATAR_SIZE } = comments_list;

@inject('stores')
@observer
export default class Item extends React.Component {
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
  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.content !== this.props.content ||
      nextProps.timeAgo !== this.props.timeAgo
    )
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
      isToCommentDeleted,
      stores
    } = this.props;

    const styles = stores.appStyles.commentsList;
    const colors = stores.themeStore.colors;

    const isPending = id[0] === '-';

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <UserAvatar
            name={authorName}
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
            <>{
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
            </>)
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