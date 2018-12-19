import React from 'react';
import moment from 'moment';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import dummy from './dummy';
import { decapitalize } from '../../../lib/capitalizr';
import { getNextDate } from '../../../lib/time';
import styles, {
  primary,
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
} from './styles';

const FORMAT = 'ddd, MMM Do, YYYY hh:mm a';

class List extends React.Component {
  static defaultProps = {
    loading: false,
    onRefresh: () => console.log('Refreshing'),
    hasMore: false,
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = nextProps => nextProps.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', { id });
  _navigateToGroup = (id) => this.props.navigation.navigate('GroupEvents', id);
  _keyExtractor = item => String(item.id);
  _renderItem = ({
    item: {
      id,
      title,
      startAt,
      endAt,
      starsCount,
      commentsCount,
      isCancelled,
      repeat,
      type,
      group,
    }
  }) => <Item
    id={id}
    title={title}
    date={this._getDate({ startAt, endAt, repeat })}
    details={this._getDetails({ repeat, type })}
    groupName={group.name}
    pictureUrl={group.pictureUrl}
    starsCount={starsCount}
    commentsCount={commentsCount}
    isCancelled={isCancelled}
    type={type}
    onPressItem={this._onPressItem}
    navigateToGroup={this._navigateToGroup}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={!this.props.hasMore} />;
  _renderEmpty = () => <Empty />;
  _getDate = ({
    startAt,
    endAt,
    repeat,
  }) => {
    return moment(getNextDate(new Date(startAt), repeat, undefined, endAt)).format(FORMAT);
  };
  _getDetails = ({
    repeat,
    type,
  }) => {
    let details = repeat === 'NEVER' ? '' : (decapitalize(repeat) + ' ');
    return details + decapitalize(type);
  }

  render() {
    const {
      loading,
      onRefresh,
    } = this.props;
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

export default withNavigationFocus(List);