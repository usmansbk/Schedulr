import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text,
  Caption,
  // IconButton,
} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
// import Icon from 'components/common/Icon';
import UserAvatar from 'components/common/UserAvatar';
import { comments_list, BULLET } from 'lib/constants';
import Attachment from 'components/common/Attachment';

const { AVATAR_SIZE } = comments_list;

class Item extends React.Component {
  state = {
    showOptions: false
  };
  _onReply = () => this.props.handleReplyComment(this.props.id, this.props.authorName, this.props.authorId);
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _navigateToViewEmbed = (params) => this.props.navigateToViewEmbed(params);
  _onDelete = () => {
    let keys = [];
    if (this.props.attachment) {
      keys = this.props.attachment.map(file => file.key);
    }
    this.props.onDelete(this.props.id, keys);
  };
  _showOptions = () => {
    if (this.props.isOwner) {
      this.setState(prev =>({
        showOptions: !prev.showOptions
      }));
    }
  };
  shouldComponentUpdate = nextProps => this.props.timeAgo !== nextProps.timeAgo;

  render() {
    const {
      authorName,
      content,
      // isOwner,
      attachment,
      authorPictureUrl,
      stores,
      timeAgo,
    } = this.props;
    
    const styles = stores.appStyles.commentsList;
    return (
      <TouchableOpacity>
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
      </TouchableOpacity>
    )
  }
}

export default inject("stores")(observer(Item));
            {/* <View style={styles.footer}>
              <View style={styles.actions}>
                {isOwner && <IconButton
                  color={colors.light_gray_3}
                  icon={() => <Icon
                    size={16}
                    name="trash"
                    color={colors.light_gray_3}
                  />}
                  onPress={this._onDelete}
                />}
                {
                  false && (
                    <IconButton
                      icon={() => <Icon
                        size={16}
                        name="reply"
                        color={colors.light_gray_3}
                      />}
                      onPress={this._onReply}
                    />
                  )
                }
              </View>
            </View> */}