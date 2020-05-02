import React from 'react';
import { Image } from 'react-native';
import { Surface, TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress();
  
  render() {
    const { pictureUrl, stores } = this.props;
    const source = pictureUrl && {uri: pictureUrl};
    const styles = stores.appStyles.carousel;
    return (
      <TouchableRipple onPress={this._onPress}>
        <Surface style={styles.container}>
          {
            Boolean(source) ? <Image resizeMode="contain"
              defaultSource={require('../../../assets/placeholder.png')}
              source={source} style={styles.image} /> : (
              <>
              <Text style={styles.text}>{I18n.get(`TEXT_noBanner`)}</Text>
              <Icon name="image" size={24} color={stores.themeStore.colors.gray}/>
              </>
            )
          }
        </Surface>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));