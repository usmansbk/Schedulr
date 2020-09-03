import React, {Component} from 'react';
import {RefreshControl} from 'react-native';
import {FlatList} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import EventItem from './Event';
import Separator from 'components/lists/Bookmarks/Separator';
import Footer from 'components/lists/Bookmarks/Footer';
import {getHumanMonth} from 'lib/time';
import {discover} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {ITEM_HEIGHT, SEPARATOR_HEIGHT, OFFSET} = discover;

class List extends Component {
  static defaultProps = {
    data: [],
    loading: false,
    error: false,
    onRefresh: () => null,
  };

  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', {id});
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', {id});
  _navigateToComments = (id, title, date) =>
    this.props.navigation.navigate('Comments', {id, title, date});

  _getItemLayout = (_, index) => {
    let length = ITEM_HEIGHT;
    return {
      length,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index,
    };
  };

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => (
    <Header
      onPressLocationButton={this.props.onPressLocationButton}
      navigation={this.props.navigation}
    />
  );
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.data.length} />;

  _renderItem = ({item}) => {
    const {
      __typename,
      id,
      title,
      description,
      banner,
      startAt,
      endAt,
      venue,
      isBookmarked,
      schedule,
    } = item;
    if (__typename === 'Event')
      return (
        <EventItem
          id={id}
          title={title}
          pictureUrl={banner && getImageUrl(banner, 320)}
          venue={venue}
          startAt={startAt}
          endAt={endAt}
          description={description}
          isBookmarked={isBookmarked}
          month={getHumanMonth(startAt)}
          day={new Date(startAt).getDate()}
          bookmarkScheduleId={schedule && schedule.id}
          onPressItem={this._onPressItem}
          navigateToBanner={this._navigateToBanner}
        />
      );
  };

  _keyExtractor = (item) => item.id;

  _onRefresh = () => this.props.onRefresh();

  render() {
    const styles = this.props.stores.styles.discover;
    let data = this.props.data;

    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            progressViewOffset={OFFSET}
            onRefresh={this._onRefresh}
            refreshing={this.props.loading}
            colors={[this.props.stores.theme.colors.primary]}
            progressBackgroundColor={this.props.stores.theme.colors.bg}
          />
        }
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        initialNumToRender={2}
        getItemLayout={this._getItemLayout}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
        onEndReached={this._onEndReached}
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  }
}

export default inject('stores')(observer(List));
