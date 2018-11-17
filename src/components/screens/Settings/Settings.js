import React, { Component } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Text
} from 'native-base';
import Firebase from 'react-native-firebase';
import IconButton from '../../common/IconButton';
import data from './items';
import SettingsItem from './SettingsItem';
import AuthButton from '../../../containers/AuthButton';
import i18n from '../../../config/i18n';
import client from '../../../config/apolloClient';

export default class Settings extends Component {

  componentDidMount = () => Firebase.analytics().setCurrentScreen('settings');

  shouldComponentUpdate = () => false;

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _reset = async () => {
    await AsyncStorage.removeItem('token');
    await client.cache.reset();
    await client.resetStore();
    ToastAndroid.show('Reset', ToastAndroid.SHORT);
  }

  _onBack = () => this.props.navigation.goBack()

  _keyExtractor = item => item.id

  _onPressItem = (id) => {
    switch (id) {
      case 'notifications':
        this.props.navigation.navigate('Notifications');
        break;
      case 'language':
        this.props.navigation.navigate('Language');
        break;
      default:
        break;
    }
  }

  _renderItem = ({item}) => {
    const {
      id,
      name,
      icon,
      note
    } = item;
    return (
      <SettingsItem 
        id={id}
        name={name}
        icon={icon}
        note={note}
        handlePress={this._onPressItem}
      />
    )
  }

  _renderListFooter = () => {
    return (
      <View style={styles.footer}>
        <AuthButton />
        <Button
          bordered
          rounded
          danger
          onPress={this._reset}
        >
          <Text uppercase={false}>Dev Reset</Text>
        </Button>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <Header>
          <Left>
            <IconButton
              onPress={this._onBack}
              name="arrow-left"
              type="Feather"
            />
          </Left>
          <Body>
            <Title>{i18n.t('screens.settings')}</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderListFooter}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 8
  }
});
