import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import Tag from 'components/common/Tag';
import ActionSheet from 'components/actionsheet/Schedule';
import { schedules } from 'lib/constants';

const { AVATAR_SIZE, SUB_AVATAR_SIZE } = schedules

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  _onLongPress = () => {
    this.ActionSheet && this.ActionSheet.getWrappedInstance().showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMuteSchedule(this.props.id, this.props.isMuted);
  };
  _navigateToInfo = () => this.props.navigateToScheduleInfo(this.props.id);
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.isOffline !== nextProps.isOffline ||
      this.props.isMuted !== nextProps.isMuted 
    );
  };
  
  render() {
    const {
      id,
      name,
      description,
      topic,
      pictureUrl,
      isClosed,
      isPublic,
      authorPictureUrl,
      authorName,
      stores,
      isMuted,
      isFollowing,
      isOffline,
      isOwner
    } = this.props;
    
    const styles = stores.appStyles.schedulesList;

    return (
      <TouchableRipple
        style={styles.itemContainer}
        onPress={this._onPress}
        onLongPress={this._onLongPress}
      >
        <View style={styles.itemContent}>
          <UserAvatar
            onPress={this._navigateToInfo}
            size={AVATAR_SIZE}
            src={pictureUrl}
            name={name}
            style={styles.itemAvatar}
          />
          {
            !isOwner && (
              <UserAvatar
                size={SUB_AVATAR_SIZE}
                src={authorPictureUrl}
                name={authorName}
                style={styles.authorAvatar}
              />
            )
          }
          {
            (!isPublic || isOffline) && <Icon
              style={styles.privateIcon}
              name={isOffline ? "cloud-off" : "eye-off"}
              size={16}
              color={stores.themeStore.colors.light_gray_3}
            />
          }
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              { isMuted && <Icon
                  name="volume-x"
                  size={18}
                  style={styles.muteIcon}
                  color={stores.themeStore.colors.light_red}
                />
              }
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemName}>{name}</Text>
            </View>
            { Boolean(description || topic) && <Caption
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemDescription}>{topic || description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Tag status="Closed" /> }
            </View>
          </View>
          <ActionSheet
            id={id}
            title={name}
            isMuted={isMuted}
            isFollowing={isFollowing}
            ref={ref => this.ActionSheet = ref}
            onMute={this._onMute}
          />
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));