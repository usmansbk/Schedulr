import React from 'react';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';

class Footer extends React.Component {
  _navigateToAlbum = () => this.props.navigation.navigate('Album', { id: this.props.id });

  render() {
    const { stores } = this.props;
    const styles = stores.appStyles.carousel;
    return (
      <TouchableRipple onPress={this._navigateToAlbum}>
        <Surface style={styles.container}>
          <Text style={styles.text}>{I18n.get(`TEXT_noAlbum`)}</Text>
          <Icon name="image" size={24} color={stores.themeStore.colors.gray}/>
        </Surface>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(withNavigation(Footer)));