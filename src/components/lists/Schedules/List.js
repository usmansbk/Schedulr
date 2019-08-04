import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import sortSchedules from 'lib/utils';
import { schedules } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
} = schedules;

class List extends Component {
  static defaultProps = {
    schedules: [],
    loading: false,
    onRefresh: () => null
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  _onPressItem = (id) => this.props.navigation.navigate('Schedule', { id, cacheFirst: true });
  _navigateToInfo = (id) => this.props.navigation.navigate('ScheduleInfo', { id });
  _keyExtractor = (item) => String(item.id);
  _renderEmptyList = () => <Empty
    error={this.props.error}
    profile={this.props.profile}
    onRefresh={this.props.onRefresh}
    loading={this.props.loading}
  />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      isPublic,
      status,
      isAuthor,
      isFollowing,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPublic={isPublic}
        isClosed={status === 'CLOSED'}
        isAuthor={isAuthor}
        isFollowing={isFollowing}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
      />
    )
  }

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.schedules.length} />;

  render() {
    const {
      schedules,
      loading,
      stores
    } = this.props;
    const data = sortSchedules(schedules);
    const styles = stores.appStyles.schedulesList;
    const colors = stores.themeStore.colors;
    const mutedList = stores.appState.mutedList;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />
        }
        style={styles.list}
        extraData={mutedList.length}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={data}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);