import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import { people_list } from 'lib/constants';

const { AVATAR_SIZE } = people_list;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  shouldComponentUpdate = (nextProps) => this.props.name !== nextProps.name || (
    this.props.pictureUrl !== nextProps.pictureUrl
  );
  
  render() {
    const {
      name,
      pictureUrl,
      stores,
      joined
    } = this.props;
    
    const styles = stores.appStyles.peopleList;

    return (
      <TouchableOpacity onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemLeft}>
            <UserAvatar
              name={name}
              size={AVATAR_SIZE}
              src={pictureUrl}
              onPress={this._onPress}
            />
          </View>
          <View style={styles.itemRight}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>{name}</Text>
            { !!joined && <Caption>{joined}</Caption> }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default inject("stores")(observer(Item));