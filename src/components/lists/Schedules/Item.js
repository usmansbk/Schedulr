import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import Tag from 'components/common/Tag';
import ActionSheet from 'components/actionsheet/Schedule';
import { schedules } from 'lib/constants';

const { AVATAR_SIZE } = schedules

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  _onLongPress = () => {
    this.ActionSheet && this.ActionSheet.showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMute(this.props.id);
  };
  _navigateToInfo = () => this.props.navigateToScheduleInfo(this.props.id);
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.name !== nextProps.name ||
      this.props.description !== nextProps.description ||
      this.props.isClosed !== nextProps.isClosed ||
      this.props.isMuted !== nextProps.isMuted
    );
  };
  
  render() {
    const {
      id,
      name,
      description,
      isClosed,
      stores,
      isMuted
    } = this.props;
    
    const isPending = id[0] === '-';
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
            name={name}
            style={styles.itemAvatar}
          />
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
                style={isPending ? styles.offlineName : styles.itemName}>{name}</Text>
            </View>
            { Boolean(description) && <Caption
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemDescription}>{description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Tag status="Closed" /> }
            </View>
          </View>
          <ActionSheet
            id={id}
            title={name}
            isMuted={isMuted}
            ref={ref => this.ActionSheet = ref}
            onMute={this._onMute}
          />
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));