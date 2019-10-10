import React from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import NotifItem from './Item';
import CommentItem from './CommentItem';
import { notifications_list } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';
import { COMMENT_TYPE } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = notifications_list;

class List extends React.Component {
  static defaultProps = {
    updates: []
  };

  _renderEmpty = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _keyExtractor = (item, index) => item.id + item.date + index;
  _renderFooter = () => <Footer visible={this.props.updates.length}/>;
  _navigateToEvent = (id) => this.props.navigation.navigate('EventDetails', { id });
  _navigateToSchedule = (id) => this.props.navigation.navigate('ScheduleInfo', { id });
  _navigateToFollowers = (id) => this.props.navigation.navigate('Followers', { id });
  _navigateToBookmarks = (id) => this.props.navigation.navigate('EventBookmarks', { id });
  _navigateToComments = (id) => this.props.navigation.navigate('Comments', { id });
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _renderItem = ({ item: {
    id,
    subject,
    message,
    image,
    timestamp,
    topic,
    entityId,
    type,
    extraData
  }}) => {
    let Item = NotifItem;
    if (type === COMMENT_TYPE) Item = CommentItem;
    return <Item
      id={id}
      entityId={entityId}
      subject={subject}
      message={message}
      topic={topic}
      type={type}
      extraData={extraData}
      pictureUrl={image && getImageUrl(image)}
      date={moment.unix(timestamp).fromNow()}
      navigateToSchedule={this._navigateToSchedule}
      navigateToEvent={this._navigateToEvent}
      navigateToFollowers={this._navigateToFollowers}
      navigateToBookmarks={this._navigateToBookmarks}
      navigateToComments={this._navigateToComments}
    />
  };

  render() {
    const {
      stores,
      onRefresh,
      loading
    } = this.props;
    const styles = stores.appStyles.notifications   
    return (
      <FlatList
        data={stores.notificationsStore.updates}
        style={styles}
        initialNumToRender={7}
        extraData={moment().format('mm')}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
      />
    );
  }
}

export default inject("stores")(observer(List));