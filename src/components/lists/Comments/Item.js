import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Paragraph,
  Caption,
  IconButton,
} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import UserAvatar from 'components/common/UserAvatar';
import { comments_list } from 'lib/constants';
import Attachment from 'components/common/Attachment';

const { AVATAR_SIZE } = comments_list;

class Item extends React.Component {
  state = {
    showOptions: false
  };
  _onReply = () => this.props.handleReplyComment(this.props.id, this.props.authorName, this.props.authorId);
  _navigateToProfile = () => this.props.navigateToProfile(this.props.authorId);
  _navigateToThread = () => this.props.navigateToThread(this.props.commentEventId, this.props.toCommentId, this.props.id);
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
      isOwner,
      attachment,
      authorPictureUrl,
      stores,
      timeAgo,
    } = this.props;
    
    const styles = stores.appStyles.commentsList;
    const colors = stores.themeStore.colors;
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
            <Caption>{timeAgo}</Caption>
          </View>
          <View style={styles.itemContent}>  
            {
              Boolean(content) && (
                <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                  <Paragraph style={styles.message}>
                    {content}
                  </Paragraph>
                </Hyperlink>
              )
            }
            { Boolean(attachment) && (
              <Attachment
                attachment={attachment}
                navigateToViewEmbed={this._navigateToViewEmbed}
              />
            )
            }
            <View style={styles.footer}>
              <View style={styles.actions}>
                {isOwner && <IconButton
                  color={colors.light_gray_3}
                  icon={() => <Icon
                    size={16}
                    name="trash-2"
                    color={colors.light_gray_3}
                  />}
                  onPress={this._onDelete}
                />}
                <IconButton
                  icon={() => <Icon
                    size={16}
                    name="feather"
                    color={colors.light_gray_3}
                  />}
                  onPress={this._onReply}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default inject("stores")(observer(Item));