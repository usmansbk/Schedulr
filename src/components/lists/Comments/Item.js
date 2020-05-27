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
import Actions from 'components/dialogs/CommentActions';
import { comments_list, BULLET } from 'lib/constants';

const { AVATAR_SIZE } = comments_list;

class Item extends React.Component {
  state = {
    showOptions: false
  };

  _commentActions = ref => this.commentActions = ref;
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _navigateToViewEmbed = (params) => this.props.navigateToViewEmbed(params);
  _onLongPress = () => this.props.onLongPress();
  _onDelete = () => {
    let keys = [];
    if (this.props.attachment) {
      keys = this.props.attachment.map(file => file.key);
    }
    this.props.onDelete(this.props.id, keys);
  };
  _showOptions = () => {
    this.commentActions.open();
  };
  shouldComponentUpdate = nextProps => this.props.timeAgo !== nextProps.timeAgo;

  render() {
    const {
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
      <TouchableOpacity onLongPress={this._showOptions}>
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
          title={authorName}
          ref={this._commentActions}
          isOwner={isOwner}
        />
      </TouchableOpacity>
    )
  }
}

export default inject("stores")(observer(Item));