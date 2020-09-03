import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {I18n} from 'aws-amplify';
import {inject, observer} from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress();

  render() {
    const {pictureUrl, stores} = this.props;
    const source = pictureUrl && {uri: pictureUrl};
    const styles = stores.styles.carousel;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Surface style={styles.container}>
          {Boolean(source) ? (
            <Image
              resizeMode="cover"
              defaultSource={require('../../../assets/placeholder.png')}
              source={source}
              style={styles.image}
            />
          ) : (
            <>
              <Text style={styles.text}>{I18n.get(`TEXT_noBanner`)}</Text>
              <Icon name="picture" size={24} color={stores.theme.colors.gray} />
            </>
          )}
        </Surface>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
