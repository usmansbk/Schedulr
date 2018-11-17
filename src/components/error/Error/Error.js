import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  H2,
  Header,
  Left,
  Right,
  Body,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import IconButton from '../../common/IconButton';
import i18n from '../../../config/i18n';
import styles from './styles';

class ErrorComponent extends Component {

  shouldComponentUpdate = () => false;

  _onBack = () => this.props.navigation.goBack();

  render() {
    const { message, retry } = this.props;
    return (
      <View style={styles.container}>
        <Header transparent>
          <Left>
            <IconButton
              onPress={this._onBack}
              name="arrow-left"
              type="Feather"
              color="primary"
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <View style={styles.content}>
          <H2 style={styles.message}>{message}</H2>
          <Button
            rounded
            bordered
            onPress={() => retry()}
            style={styles.button}
          >
            <Text uppercase={false}>{i18n.t('button.retry')}</Text>
          </Button>
        </View>
      </View>
    )
  }
}

export default withNavigation(ErrorComponent);