import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import dummy from './dummy';
import styles, { primary } from './styles';

class List extends React.Component {
  shouldComponentUpdate = nextProps => nextProps.isFocused;
  _keyExtractor = item => item.id;
  _renderItem = ({
    item: {
      id,
      title,
      start,
      end,
      allDay,
      starsCount,
      commentsCount,
      isCancelled,
      repeat,
      type,
    }
  }) => <Item
    id={id}
    title={title}
    start={start}
    end={end}
    allDay={allDay}
    starsCount={starsCount}
    commentsCount={commentsCount}
    isCancelled={isCancelled}
    repeat={repeat}
    type={type}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={!defaultValues.hasMore} />;
  _renderEmpty = () => <Empty />;

  render() {
    const {
      loading,
      onRefresh,
    } = defaultValues;
    return (
      <FlatList
        data={dummy}
        refreshing={loading}
        refreshControl={<RefreshControl refreshing={loading} colors={[primary]} />}
        onRefresh={onRefresh}
        style={styles.list}
        getItemLayout={this._getItemLayout}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        ListEmptyComponent={this._renderEmpty}
      />
    );
  }
}

const defaultValues = {
  loading: false,
  onRefresh: () => console.log('Refreshing'),
  hasMore: false,
}

export default withNavigationFocus(List);