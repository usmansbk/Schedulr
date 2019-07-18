import React from 'react';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Footer from './Footer';
import Item from './Item';

@inject('stores')
@observer
export default class List extends React.Component {
  _renderEmpty = () => <Empty />;
  _renderFooter = () => <Footer visible={this.props.notifications.length}/>;
  _renderItem = () => <Item />;

  render() {
    const { stores, notifications } = this.props;

    const styles = stores.appStyles.notifications;
    
    return (
      <FlatList
        data={notifications}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}