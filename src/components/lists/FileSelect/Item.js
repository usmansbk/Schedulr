import React from 'react';
import { View, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import MediaIcon from 'components/common/MediaIcon';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.uri);
  
  render() {
    const { stores, type, uri, disabled } = this.props;
    const styles = stores.appStyles.fileSelect;

    return (
      <TouchableRipple disabled={disabled} style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <MediaIcon type={type} style={{width: 60, height: 60}} uri={uri} />
        </View>
      </TouchableRipple>
    );
  }
}

export default inject('stores')(observer(Item));