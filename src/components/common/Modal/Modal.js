import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import i18n from '../../../config/i18n';

export default class GenericModal extends Component {
  shouldComponentUpdate = (nextProps) => {
    return this.props.loading !== nextProps.loading ||
      this.props.isVisible !== nextProps.isVisible;
  }

  render() {
    const {
      loading,
      isVisible,
      title,
      message,
      handleAccept,
      handleClose
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackButtonPress={this._handleClose}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          {
            loading ? <Spinner /> : (
              <View style={styles.buttons}>
                <Button
                  disabled={loading}
                  rounded
                  bordered
                  onPress={handleClose}
                  style={styles.button}
                >
                  <Text uppercase={false}>{i18n.t('options.no')}</Text>
                </Button>
                <Button
                  rounded
                  bordered
                  disabled={loading}
                  onPress={handleAccept}
                >
                  <Text uppercase={false}>{i18n.t('options.yes')}</Text>
                </Button>
              </View>
            )
          }
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8
  },
  buttons: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#404040',
    fontSize: 20
  },
  message: {
    color: '#404040'
  }
})