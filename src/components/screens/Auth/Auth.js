import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Container,
  Spinner,
  Header,
  Left,
  Body,
  H3
} from 'native-base';
import { View } from 'react-native';
import Firebase from 'react-native-firebase';
import LoginButtons from '../../LoginButtons';
import IconButton from '../../common/IconButton';
import Logo from '../../../containers/CommunityLogo';
import styles from './styles';

class Auth extends Component {
  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('login');
    Firebase.analytics().logEvent('auth_screen');
  }
  
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isLoggedIn !== this.props.isLoggedIn ||
      nextProps.agent !== this.props.agent ||
      nextProps.loading !== this.props.loading ||
      nextProps.name !== this.props.name;
  }

  render() {
    const {
      isLoggedIn,
      agent,
      loading,
      handleLogin,
      onBack
    } = this.props;

    return ( 
      <Container>
        <Header transparent>
          <Left>
            <IconButton
              name="arrow-left"
              type="Feather"
              onPress={onBack}
              color="primary"
            />
          </Left>
          <Body></Body>
        </Header>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.margin}>
              <Logo />
            </View>
            { loading ? <Spinner /> : (
              <LoginButtons
                handleLogin={handleLogin}
                agent={agent}
                isLoggedIn={isLoggedIn}
              />
            )}
          </View>
        </View>
      </Container>
    )
  }
}

export default withNavigation(Auth);