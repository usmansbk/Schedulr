import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import UserAvatar from 'components/common/UserAvatar';
import Tag from 'components/common/Tag';
import { boards } from 'lib/constants';

const { AVATAR_SIZE } = boards

@inject('stores')
@observer
export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToInfo = () => this.props.navigateToBoardInfo(this.props.id);
  render() {
    const {
      id,
      name,
      description,
      isClosed,
      stores
    } = this.props;
    
    const isPending = id[0] === '-';

    const styles = stores.appStyles.boardsList;

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <UserAvatar
            onPress={this._navigateToInfo}
            size={AVATAR_SIZE}
            name={name}
            style={styles.itemAvatar}
          />
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={isPending ? styles.offlineName : styles.itemName}>{name}</Text>
            </View>
            { Boolean(description) && <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Tag status="Closed" /> }
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}