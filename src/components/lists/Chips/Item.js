import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.text);

  componentWillUpdate = (nextProps) => this.props.selected !== nextProps.selected;
  
  render() {
    const { text, selected, stores } = this.props;
    const styles = stores.appStyles.chipList;
    let icon = null;
    if (text === '__current__location__') {
      icon = <Icon
        name="map-pin"
        size={18}
        color={stores.themeStore.colors.gray}
      />;
    } else if (text === '__search__location__') {
      icon = <Icon
        name="map"
        size={18}
        color={stores.themeStore.colors.gray}
      />;
    }

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={[styles.itemContent, selected ? styles.selected : {}]}> 
        {
          icon ? icon : <Text style={[styles.itemText, selected ? styles.selectedText : {}]}>{text}</Text>
        }
        </View>
      </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));