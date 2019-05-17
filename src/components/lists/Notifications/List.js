import React from 'react';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import Empty from './Empty';
import Footer from './Footer';
import Item from './Item';

@inject('stores')
@observer
export default class List extends React.Component {
  _renderEmpty = () => <Empty visible />;
  _renderFooter = () => <Footer />;
  _renderItem = () => <Item />;
  render() {
    const styles = this.props.stores.appStyles.notifications;
    
    return (
      <FlatList
        data={[]}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}