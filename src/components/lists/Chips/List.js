import React from 'react';
import { Chip } from 'react-native-paper';
import { FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';

class HorizontalList extends React.Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

export default inject("stores")(observer(HorizontalList));