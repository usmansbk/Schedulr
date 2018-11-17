import React from 'react';
import {
  AsyncStorage,
  Image,
  View,
} from 'react-native';
import {
  Container,
  Spinner,
} from 'native-base';
import Firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import styles from './styles';
import theme from '../../theme';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = () => false

  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('auth_loading');
  }

  navigate = (url) => {
    this._bootstrapAsync();
    SplashScreen.hide();
  }
  
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _bootstrapAsync = async () => {
    const authToken = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(authToken ? 'App' : 'Auth');
  }

  render() {
    const uri = { uri: 'logo' };

    return (
      <Container style={styles.container}>
        <View style={styles.content}>
          <Image source={uri} style={[styles.margin, styles.logo]}/>
          <Spinner color={theme.backgroundColor} />
        </View>
      </Container>
    )
  }
}