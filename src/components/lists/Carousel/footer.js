import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    elevation: 4
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  }
});

export default class Footer extends React.Component {

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
    const { isEmpty, isOwner } = this.props;
    return (
      <TouchableRipple onPress={this._openDocumentPicker}>
        <Surface style={styles.container}>
          <Text style={styles.text}>{I18n.get(`TEXT_${(isEmpty && !isOwner) ? "noAlbum" : "addImagesToAlbum"}`)}</Text>
          <Icon name="image" size={24}/>
        </Surface>
      </TouchableRipple>
    );
  }
}