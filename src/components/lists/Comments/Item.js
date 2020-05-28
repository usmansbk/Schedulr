import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text,
  Caption,
} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import Attachment from 'components/common/Attachment';
import Actions from 'components/actionsheet/Comment';
import { comments_list, BULLET } from 'lib/constants';

const { AVATAR_SIZE } = comments_list;

class Item extends React.Component {
  state = {
    showOptions: false
  };

  _commentActions = ref => this.commentActions = ref;
  _showOptions = () => {
    this.commentActions.getWrappedInstance().open();
  };
  _onReply = () => {
    this.props.onReply([
      this.props.id,
      this.props.authorId,
      this.props.authorName,
    ]);
  };

  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _navigateToViewEmbed = (params) => this.props.navigateToViewEmbed(params);

  shouldComponentUpdate = nextProps => this.props.timeAgo !== nextProps.timeAgo;

  render() {
    const {
      id,
      commentEventId,
      authorName,
      content,
      isOwner,
      attachment,
      authorPictureUrl,
      stores,
      timeAgo,
    } = this.props;
    
    const styles = stores.appStyles.commentsList;
    return (
      <TouchableOpacity onPress={this._onReply} onLongPress={this._showOptions}>
        <View style={styles.itemContainer}>
          <UserAvatar
            name={authorName}
            src={authorPictureUrl}
            size={AVATAR_SIZE}
            onPress={this._navigateToProfile}
            style={styles.itemLeft}
          />
          <View style={styles.itemContent}>
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              style={styles.authorName}
            >
              {authorName} <Caption>{BULLET} {timeAgo}</Caption>
            </Text>
            {Boolean(content) && (
              <View
                style={[
                  styles.item,
                  styles.message,
                  Boolean(attachment) ? styles.withAttachment : {}
                ]}>
                <Hyperlink linkStyle={styles.linkStyle} linkDefault>
                  <Text>{content}</Text>
                </Hyperlink>
              </View>
            )}
            { Boolean(attachment) && (
              <View style={[styles.item, styles.attachment]}>
                <Attachment
                  attachment={attachment}
                  navigateToViewEmbed={this._navigateToViewEmbed}
                />
              </View>
            )}
          </View>
        </View>
        <Actions
          id={id}
          commentEventId={commentEventId}
          title={authorName}
          ref={this._commentActions}
          isOwner={isOwner}
          attachment={attachment}
          onReply={this._onReply}
        />
      </TouchableOpacity>
    )
  }
}

export default inject("stores")(observer(Item));