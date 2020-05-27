import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import MediaIcon from 'components/common/MediaIcon';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.uri);
  
  render() {
    const { stores, type, uri, disabled } = this.props;
    const styles = stores.appStyles.fileSelect;

    return (
      <TouchableOpacity disabled={disabled} style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <MediaIcon type={type.toLowerCase()} style={{width: 60, height: 60}} uri={uri} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));