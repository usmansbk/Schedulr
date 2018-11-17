import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import MemberItem from './MemberItem';

export default class MemberList extends PureComponent {

  _keyExtractor = item => item.node.id

  _renderItem = ({item: { node }}) => {
    const {
      name, photo
    } = node;

    return (
      <MemberItem
        name={name}
        photo={photo}
      />
    )
  }

  _onEndReached = () => {
    const { hasNextPage, fetchMoreMembers } = this.props;
    if (hasNextPage) {
      fetchMoreMembers();
    }
  }

  render() {
    const {
      members=[],
      loading,
      onRefresh,
    } = this.props;
    return (
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        keyExtractor={this._keyExtractor}
        onRefresh={onRefresh}
        data={members}
        refreshing={loading}
        renderItem={this._renderItem}
      />
    )
  }
}