import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import EventItem from './Item';
import Separator from 'components/lists/Bookmarks/Separator';
import {
  getHumanMonth
} from 'lib/time';
import { discover } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = discover;

class List extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false,
    onRefresh: () => null
  };

  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });

  _getItemLayout = (_, index) => {
    let length = ITEM_HEIGHT;
    return (
      {
        length,
        offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
        index
      }
    );
  };

  _renderEmptyList = () => <Empty />;

  _renderSeparator = () => <Separator />;

  _renderItem = ({ item }) => {
    const {
      id,
      title,
      description,
      banner,
      startAt,
      endAt,
      venue,
      schedule
    } = item;
    return <EventItem
      id={id}
      title={title}
      pictureUrl={banner && getImageUrl(banner, 320)}
      venue={venue}
      startAt={startAt}
      endAt={endAt}
      description={description}
      month={getHumanMonth(startAt)}
      day={new Date(startAt).getDate()}
      bookmarkScheduleId={schedule && schedule.id}
      onPressItem={this._onPressItem}
      navigateToBanner={this._navigateToBanner}
    />;
  };

  _keyExtractor = (item) => item.id;

  _onRefresh = () => this.props.onRefresh();

  render() {
    const styles = this.props.stores.appStyles.discover;
    let data = this.props.data;

    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={this.props.loading}
            colors={[this.props.stores.themeStore.colors.primary]}
            progressBackgroundColor={this.props.stores.themeStore.colors.bg}
          />
        }
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        onEndReached={this._onEndReached}
        ItemSeparatorComponent={this._renderSeparator}
      />
    )
  }
}

export default inject("stores")(observer(List));
