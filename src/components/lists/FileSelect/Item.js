import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.uri);
  
  render() {
    const { stores, name, uri } = this.props;
    const styles = stores.appStyles.fileSelect;
    fetch(uri).then(response => response.blob())
      .then(blob => console.log(blob));

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject('stores')(observer(Item));