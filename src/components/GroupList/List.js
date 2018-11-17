import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import EmptyList from '../common/EmptyList';
import GroupItem from './GroupItem';
import i18n from '../../config/i18n';

const ITEM_HEIGHT = 80;
const SEPERATOR_HEIGHT = 1;

const getItemLayout = (_, index) => (
  {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index + SEPERATOR_HEIGHT,
    index
  }
);

class List extends Component {

  shouldComponentUpdate = (nextProps) => {
    return (this.props.groups !== nextProps.groups) ||
      (this.props.loading !== nextProps.loading);
  }

  _onPressItem = (id) => this.props.navigation.navigate('GroupScreen', { id })

  _onPressAvatar = ({ id, name }) => 
    this.props.navigation.navigate(
      'ImageViewer',
      {
        id,
        name,
        action: 'group',
      })

  _keyExtractor = (item) => item.node.id

  _renderEmptyList = () => 
    this.props.loading ? null : (
    <EmptyList
      title={i18n.t('group.empty.title')}
      note={i18n.t('group.empty.note')}
    />
    )

  _renderItem = ({item: { node }}) => {
    const {
      id,
      name,
      description,
      isPrivate,
      isClosed,
      isAuthor,
      logo
    } = node;

    const path = logo && logo.path;

    return (
      <GroupItem
        id={id}
        name={name}
        description={description}
        isPrivate={isPrivate}
        isClosed={isClosed}
        isAuthor={isAuthor}
        logo={path}
        onPressItem={this._onPressItem}
        onPressAvatar={this._onPressAvatar}
      />
    )
  }

  _renderSeparator = () => <View style={{ height: SEPERATOR_HEIGHT }} />
  _renderFooter = () => <View style={{height: 80}}/>

  render() {
    const {
      groups=[],
    } = this.props;
    return (
      <FlatList
        extraData={groups.length}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={groups}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default withNavigation(List);