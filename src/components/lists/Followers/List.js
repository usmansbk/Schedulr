import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import { followers_list } from 'lib/constants';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import Empty from './Empty';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = followers_list;

@inject('stores')
@observer
class List extends React.Component {
  static defaultProps = {
    followers: [],
    loading: false,
    hasMore: false,
    onRefresh: () => null,
  };
  shouldComponentUpdate = (nextProps) => { 
    return (nextProps.navigation.isFocused &&
      (
        nextProps.followers !== this.props.followers ||
        nextProps.loading !== this.props.loading
      )
    );
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.navigate('UserProfile', { id });
  _keyExtractor = item => String(item.id);
  _renderFooter = () => <Footer
    hide={!this.props.followers.length}
    loading={this.props.loading}
    hasMore={this.props.hasMore}
    onPress={this._onEndReached}
  />;
  _renderSeparator = () => <Separator />;
  _renderEmpty = () => this.props.loading ? null : <Empty
    onRefresh={this.props.onRefresh}
    error={this.props.error}
    isAuthor={this.props.isAuthor}
  />;
  _renderItem = ({item: {
    id,
    name,
    pictureUrl
  }}) => {
    return (
      <Item
        id={id}
        name={name}
        pictureUrl={pictureUrl}
        onPressItem={this._onPressItem}
      />
    )
  }

  _onEndReached = async () => {
    const { nextToken, fetchMoreFollowers } = this.props;
    if (nextToken) await fetchMoreFollowers(nextToken);
  };

  render() {
    const {
      followers,
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.followersList;

    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListEmptyComponent={this._renderEmpty}
        getItemLayout={this._getItemLayout}
        data={followers}
        refreshing={loading}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[stores.themeStore.colors.primary]}
          />
        }
      />
    )
  }
}

export default withNavigationFocus(List);