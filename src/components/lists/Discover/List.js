import React, {Component} from 'react';
import { withCollapsible } from 'react-navigation-collapsible';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import Item from './Item';

class DISCOVERTab extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false
  };

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => <Header navigation={this.props.navigation} />;

  renderItem = ({item}) => <Item />;

  componentDidMount = async () => await this.props.stores.locationStore.fetchLocation(true);

  _keyExtractor = (item) => item.id; 

  render() {
    const styles = this.props.stores.appStyles.discover;

    return (
      <FlatList 
        style={styles.list}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        sticky
      />
    )
  }
}

export default inject("stores")(observer(DISCOVERTab));
