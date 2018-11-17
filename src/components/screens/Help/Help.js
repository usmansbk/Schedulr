import React, { Component } from 'react'
import { View, FlatList } from 'react-native';
import {
  Header,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';
import Firebase from 'react-native-firebase';
import IconButton from '../../common/IconButton';
import data from './items';
import HelpItem from './HelpItem';
import i18n from '../../../config/i18n';

export default class Help extends Component {

  componentDidMount = () => Firebase.analytics().setCurrentScreen('help');

  shouldComponentUpdate = () => false;

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _onBack = () => this.props.navigation.goBack()

  _keyExtractor = item => item.id

  _onPressItem = (id) => {
    const target = data.find(elem => elem.id === id);
    target && target.handlePress && target.handlePress();
  }

  _renderItem = ({item}) => {
    const {
      id,
      name,
      icon,
      note
    } = item;
    return (
      <HelpItem 
        id={id}
        name={name}
        icon={icon}
        note={note}
        handlePress={this._onPressItem}
      />
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
            <Title>{i18n.t('screens.help')}</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}