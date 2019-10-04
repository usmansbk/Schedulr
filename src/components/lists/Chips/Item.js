import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.text);

  componentWillUpdate = (nextProps) => this.props.selected !== nextProps.selected;
  
  render() {
    const { text, selected, stores } = this.props;
    const styles = stores.appStyles.chipList;

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={[styles.itemContent, selected ? styles.selected : {}]}>
          <Text style={[styles.itemText, selected ? styles.selectedText : {}]}>{text}</Text>
        </View>
      </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));