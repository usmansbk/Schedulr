import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.id);

  shouldComponentUpdate = (nextProps) =>
    this.props.selected !== nextProps.selected;

  render() {
    const {text, selected, stores} = this.props;
    const styles = stores.styles.chipList;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this._onPress}>
        <View style={[styles.itemContent, selected ? styles.selected : {}]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.itemText, selected ? styles.selectedText : {}]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
