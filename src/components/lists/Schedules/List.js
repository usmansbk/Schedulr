import React, {Component} from 'react';
import {withNavigation, FlatList} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import {sortSchedules} from 'lib/utils';
import {schedules, SCHEDULE_CLOSED, BANNER} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = schedules;

class List extends Component {
  static defaultProps = {
    schedules: [],
    loading: false,
    onRefresh: () => null,
  };
  _getItemLayout = (_, index) => {
    let length = ITEM_HEIGHT;
    if (index === 0) length = BANNER + 4;
    return {
      length,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index,
    };
  };

  _onPressItem = (id) => this.props.navigation.navigate('Schedule', {id});
  _navigateToInfo = (id) =>
    this.props.navigation.navigate('ScheduleInfo', {id});
  _keyExtractor = (item) => String(item.id);
  _renderEmptyList = () => (
    <Empty
      error={this.props.error}
      profile={this.props.profile}
      onRefresh={this.props.onRefresh}
      loading={this.props.loading}
    />
  );
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      topic,
      picture,
      isPublic,
      status,
      isOwner,
      isFollowing,
      isOffline,
      author,
      updatedAt,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        topic={topic}
        isPublic={isPublic}
        pictureUrl={picture && getImageUrl(picture)}
        authorPictureUrl={
          author &&
          (author.avatar ? getImageUrl(author.avatar) : author.pictureUrl)
        }
        authorName={author && author.name}
        isClosed={status === SCHEDULE_CLOSED}
        isMuted={this.props.stores.appState.mutedSchedules.includes(id)}
        isOwner={isOwner}
        isOffline={isOffline}
        isFollowing={isFollowing}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
        updatedAt={updatedAt}
      />
    );
  };

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.schedules.length} />;
  _renderHeader = () => (this.props.schedules.length ? <Header /> : null);

  render() {
    const {schedules, stores} = this.props;
    const data = sortSchedules(schedules);

    return (
      <FlatList
        style={stores.styles.schedulesList.list}
        extraData={stores.appState.mutedSchedules.length || schedules.length}
        contentContainerStyle={stores.styles.schedulesList.contentContainer}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={data}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}

const withStores = inject('stores')(observer(List));

export default withNavigation(withStores);
