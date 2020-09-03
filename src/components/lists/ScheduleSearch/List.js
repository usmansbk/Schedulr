import React, {Component} from 'react';
import {RefreshControl} from 'react-native';
import {withNavigationFocus, FlatList} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import {schedule_search, SCHEDULE_CLOSED} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';
import Suspense from 'components/common/Suspense';

const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = schedule_search;

class List extends Component {
  state = {
    fetchingMore: false,
    display: false,
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  static defaultProps = {
    schedules: [],
    loading: false,
    onRefresh: () => null,
    fetchMore: () => null,
  };
  _getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
    index,
  });
  _onPressItem = (id) => this.props.navigation.navigate('ScheduleInfo', {id});
  _keyExtractor = (item) => String(item.id);
  _onEndReached = async () => {
    const {fetchMore, loading, nextToken} = this.props;
    if (!loading && nextToken) {
      this.setState({fetchingMore: true});
      await fetchMore(Number(nextToken));
      this.setState({fetchingMore: false});
    }
  };
  _renderEmptyList = () => <Empty loading={this.props.loading} />;
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
      updatedAt,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        topic={topic}
        pictureUrl={picture && getImageUrl(picture)}
        isPublic={isPublic}
        isClosed={status === SCHEDULE_CLOSED}
        isOwner={isOwner}
        isFollowing={isFollowing}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
        updatedAt={updatedAt}
      />
    );
  };

  _renderSeparator = () => <Separator />;
  _renderFooter = () => (
    <Footer
      visible={this.props.schedules.length}
      loading={this.props.loading && this.state.fetchingMore}
      onPress={this._onEndReached}
      hasMore={this.props.from}
    />
  );

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  render() {
    if (!this.state.display) return <Suspense />;
    const {schedules, loading, onRefresh, stores} = this.props;
    const {fetchingMore} = this.state;

    const styles = stores.appStyles.scheduleSearch;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !fetchingMore}
            colors={[stores.theme.colors.primary]}
            progressBackgroundColor={stores.theme.colors.bg}
          />
        }
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={schedules}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        keyboardShouldPersistTaps="always"
      />
    );
  }
}

const withStores = inject('stores')(observer(List));

export default withNavigationFocus(withStores);
