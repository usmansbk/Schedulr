import React, { PureComponent } from 'react';
import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Container
} from 'native-base';
import { Alert } from 'react-native';
import Firebase from 'react-native-firebase';
import IconButton from '../../common/IconButton';
import i18n from '../../../config/i18n';

const NEW_GROUP_PATH = '../../../containers/screens/NewGroup';
const EDIT_GROUP_PATH = '../../../containers/screens/EditGroup';

let Form = null;

export default class Group extends PureComponent {

  _onBack = () => this.props.navigation.goBack();

  _handleFirstConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  }
  
  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('group_form');
  }

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  render() {
    const id = this.props.navigation.getParam('id');
    const title = this.props.navigation.getParam('title')
    if (id) {
      Form = require(EDIT_GROUP_PATH).default;
    } else {
      Form = require(NEW_GROUP_PATH).default;
    }
    return (
    <Container>
      <Header>
        <Left>
          <IconButton
            onPress={this._onBack}
            name="arrow-left"
            type="Feather"
          />
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <IconButton
            onPress={() => Alert.alert('What is a group?', i18n.t('help.group'))}
            name="help-circle"
            type="Feather"
          />
        </Right>
      </Header>
      <Form id={id} />
    </Container>)
  }
}