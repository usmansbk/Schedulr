import React from 'react';
import {RefreshControl} from 'react-native';
import {FlatList} from 'react-navigation';
import moment from 'moment';
import {I18n} from 'aws-amplify';
import {inject, observer} from 'mobx-react';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import NotifItem from './Item';
import {notifications_list} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = notifications_list;

class List extends React.Component {
  static defaultProps = {
    updates: [],
  };

  _renderEmpty = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _keyExtractor = (item, index) => item.id + item.date + index;
  _renderFooter = () => <Footer visible={this.props.updates.length} />;
  _navigateToEvent = (id, from) =>
    this.props.navigation.navigate('EventDetails', {id, from});
  _navigateToSchedule = (id) =>
    this.props.navigation.navigate('ScheduleInfo', {id});
  _navigateToFollowers = (id) =>
    this.props.navigation.navigate('Followers', {id});
  _navigateToBookmarks = (id) =>
    this.props.navigation.navigate('EventBookmarks', {id});
  _navigateToComments = (id) =>
    this.props.navigation.navigate('Comments', {id});
  _onRefresh = () => {
    this.props.onRefresh && this.props.onRefresh();
    this.props.stores.notifications.fetchNotifications();
  };
  _getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
    index,
  });
  _renderItem = ({
    item: {
      id,
      subject,
      message,
      image,
      timestamp,
      topic,
      entityId,
      type,
      extraData,
      seen,
    },
  }) => {
    let Item = NotifItem;
    let pictureUrl;
    if (image) {
      pictureUrl = getImageUrl(image);
    } else {
      if (extraData) {
        pictureUrl = extraData.pictureUrl;
      }
    }
    let date = I18n.get('now');
    if (moment() > moment.unix(timestamp).add(1, 'minute')) {
      date = moment.unix(timestamp).fromNow();
    }
    return (
      <Item
        id={id}
        entityId={entityId}
        subject={subject}
        message={message}
        topic={topic}
        type={type}
        extraData={extraData}
        seen={seen}
        pictureUrl={pictureUrl}
        date={date}
        from={extraData && extraData.ref}
        navigateToSchedule={this._navigateToSchedule}
        navigateToEvent={this._navigateToEvent}
        navigateToFollowers={this._navigateToFollowers}
        navigateToBookmarks={this._navigateToBookmarks}
        navigateToComments={this._navigateToComments}
      />
    );
  };

  render() {
    const {stores, refreshing} = this.props;
    const styles = stores.styles.notifications;
    return (
      <FlatList
        data={stores.notifications.updates}
        style={styles}
        initialNumToRender={1}
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
            onRefresh={this._onRefresh}
            refreshing={stores.notifications.loading && refreshing}
            colors={[stores.theme.colors.primary]}
            progressBackgroundColor={stores.theme.colors.bg}
          />
        }
      />
    );
  }
}

export default inject('stores')(observer(List));
