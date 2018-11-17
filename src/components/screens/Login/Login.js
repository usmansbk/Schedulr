import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Container,
  Button,
  Text,
  Spinner,
  H3,
} from 'native-base';
import { View } from 'react-native';
import Firebase from 'react-native-firebase';
import LoginButton from '../../LoginButtons';
import Logo from '../../common/Logo';
import styles from './styles';
import i18n from '../../../config/i18n';

class LoginScreen extends PureComponent {
  componentDidMount = () => Firebase.analytics().setCurrentScreen('login');

  _continue = () => this.props.navigation.navigate('App');
  
  render() {
    const {
      isLoggedIn,
      agent,
      loading,
      handleLogin,
      logo,
    } = this.props;
    
    return ( 
      <Container style={styles.container}>
        <View style={styles.content}>
          <View style={styles.margin}>
            <Logo src={logo} />
            <H3 style={styles.welcome}>Welcome</H3>
          </View>
          { loading ? <Spinner /> : (
            <View>
              <Button
                block
                rounded
                bordered
                onPress={this._continue}
                style={styles.spaceButton}
              >
                <Text uppercase={false}>{i18n.t('auth.guest')}</Text>
              </Button>
              <LoginButton
                handleLogin={handleLogin}
                agent={agent}
                isLoggedIn={isLoggedIn}
              />
            </View>
          )}
        </View>
      </Container>
    )
  }
}

export default withNavigation(LoginScreen);