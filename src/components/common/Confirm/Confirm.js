import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';

const defaultTitle = "Archive this board?";
const defaultMessage = "If you archive, we'll hide it from your profile and you won't be able to save"

export default class Confirm extends React.Component {

  open = () => this.RBSheet.open();

  _cancel = () => this.RBSheet.close();

  _refRBSheet = ref => this.RBSheet = ref;
  render() {
    const {
      title=defaultTitle,
      message=defaultMessage,
      confirmText=I18n.get("BUTTON_confirm"),
      onConfirm
    } = this.props;
    return (
      <RBSheet
        ref={this._refRBSheet}
        closeOnDragDown
        customStyles={{
          wrapper: styles.wrapper,
          draggableIcon: styles.draggableIcon,
          container: styles.container
        }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.footer}>
            <Button onPress={this._cancel}>{I18n.get("BUTTON_cancel")}</Button>
            <Button onPress={onConfirm}>{confirmText}</Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}