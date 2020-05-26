import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';

export default class Confirm extends React.Component {

  open = () => this.RBSheet.open();

  _cancel = () => this.RBSheet.close();

  _onConfirm = () => {
    this._cancel();
    setTimeout(this.props.onConfirm, 200); // 200ms allows the sheet to close
  };

  _refRBSheet = ref => this.RBSheet = ref;
  render() {
    const {
      title,
      message,
      confirmText=I18n.get("BUTTON_confirm"),
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
            <Button onPress={this._onConfirm}>{confirmText}</Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}