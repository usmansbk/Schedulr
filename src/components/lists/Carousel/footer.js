import React from 'react';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';

class Footer extends React.Component {

  _openDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.images
        ]
      });
      let total = response.reduce((accumulator, currentVal) => accumulator + Number(currentVal.size), 0);
      this.setState({ total, loaded: 0 });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Do nothing
      } else {
        logger.logError(error);
      }
    }
  };

  render() {
    const { stores } = this.props;
    const styles = stores.appStyles.carousel;
    return (
      <TouchableRipple onPress={this._openDocumentPicker}>
        <Surface style={styles.container}>
          <Text style={styles.text}>{I18n.get(`TEXT_noAlbum`)}</Text>
          <Icon name="image" size={24} color={stores.themeStore.colors.gray}/>
        </Surface>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Footer));