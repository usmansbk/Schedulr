import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import AdItem from './AdItem';
import EventItem from './Event';
import Separator from 'components/lists/Bookmarks/Separator';
import Footer from 'components/lists/Bookmarks/Footer';
import {
  getHumanMonth
} from 'lib/time';
import { discover, MEDIUM_RECTANGLE } from 'lib/constants';
// import { injectAds } from 'lib/utils';
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
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });

  _getItemLayout = (_, index) => {
    let length = ITEM_HEIGHT;
    // if (index === 2) length = MEDIUM_RECTANGLE; // Medium Rectangle Size ad 
    return (
      {
        length,
        offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
        index
      }
    );
  };

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => <Header
    onPressLocationButton={this.props.onPressLocationButton}
    navigation={this.props.navigation}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.data.length} />;

  _renderItem = ({ item }) => {
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
    } = item;
    if (__typename === 'Advert') return <AdItem />;
    if (__typename === 'Event') return <EventItem
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
      onPressItem={this._onPressItem}
      navigateToBanner={this._navigateToBanner}
    />;
  };

  _keyExtractor = (item) => item.id;

  _onRefresh = () => this.props.onRefresh();

  render() {
    const styles = this.props.stores.appStyles.discover;
    let data = this.props.data;
    // if (data.length >= 1) data = injectAds(data, 2);

    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            progressViewOffset={80}
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
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        initialNumToRender={2}
        getItemLayout={this._getItemLayout}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
        onEndReached={this._onEndReached}
        ItemSeparatorComponent={this._renderSeparator}
      />
    )
  }
}

export default inject("stores")(observer(List));
