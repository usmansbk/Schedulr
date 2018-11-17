import React, { PureComponent } from 'react';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';
import Firebase from 'react-native-firebase';
import { View } from 'react-native';
import IconButton from '../../common/IconButton';
import MemberList from '../../../containers/MemberList';
import styles from './styles';
import i18n from '../../../config/i18n';

export default class Members extends PureComponent {
  componentDidMount = () => Firebase.analytics().setCurrentScreen('members');

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header>
        <Left>
          <IconButton
            onPress={() => navigation.goBack()}
            name="arrow-left"
            type="Feather"
          />
        </Left>
        <Body>
          <Title>{i18n.t('screens.members')}</Title>
        </Body>
        <Right>
        </Right>
      </Header>)
    };
  };

  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <View style={styles.container}>
        <MemberList id={id} />
      </View>
    )
  }
}