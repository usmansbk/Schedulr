import React, { PureComponent } from 'react'
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';
import Firebase from 'react-native-firebase';
import IconButton from '../../common/IconButton';
import NotificationsSettings from '../../../containers/Settings/Notifications';
import i18n from '../../../config/i18n';

export default class Notifications extends PureComponent {
  componentDidMount = () => Firebase.analytics().setCurrentScreen('notifications_settings');

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _onBack = () => this.props.navigation.goBack();
  
  render() {
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
            <Title>{i18n.t('screens.notifications')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <NotificationsSettings />
        </Content>
      </Container>
    )
  }
}