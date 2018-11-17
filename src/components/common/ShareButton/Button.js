import React, { PureComponent } from 'react';
import {
  ListItem,
  Text,
} from 'native-base';
import { StyleSheet } from 'react-native'
import Config from 'react-native-config';
import Share from 'react-native-share';
import i18n from '../../../config/i18n';

export default class ShareButton extends PureComponent {
  render() {
    return (
      <ListItem
        button
        noIndent
        onPress={
          () => {
            const url = `https://${Config.DOMAIN}`
            const message = i18n.t('share.message');
            const options = {
              title: i18n.t('share.invite'),
              message,
              subject: message,
              url
            }
            Share.open(options);
          }}
      >
        <Text style={styles.text}>{i18n.t('drawer.invite')}</Text>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 14
  }
})