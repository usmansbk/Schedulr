import React, { Component } from 'react';
import {
  Form,
  Item,
  Spinner,
  Text,
  Button,
  Input,
  Label
} from 'native-base';
import Firebase from 'react-native-firebase';
import {
  View,
  NetInfo
} from 'react-native';
import ErrorAlert from '../../error/ErrorAlert';
import Logo from '../../common/Logo';
import i18n from '../../../config/i18n';
import styles from './styles';

const PROTOCOL = 'https://';

export default class Community extends Component {

  state = {
    url: '',
    isConnected: true,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.url !== this.state.url ||
      nextState.isConnected !== this.state.isConnected ||
      nextProps.loading !== this.props.loading;
  }

  _handleFirstConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  }

  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('add_community');
    NetInfo.isConnected.fetch().then(isConnected => this.setState({ isConnected }));
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  componentWillUnmount = () => {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _onBack = () => this.props.navigation.goBack()

  _onTextChange = (value) => {
    this.setState({ url: value })
  }

  _onPress = () => {
    const { url } = this.state;
    if (url) {
      this.props.addCommunity({
        variables: {
          input: {
            url: PROTOCOL + url
          }
        }
      });
    }
  }

  _onPreview = () => this.props.navigation.navigate('App');

  render() {
    const { loading } = this.props;
    const { url, isConnected } = this.state;

    return (
      <View style={styles.container}>
        { !isConnected &&<ErrorAlert message={i18n.t('error.no_internet')} /> }
        <View style={styles.content}>
          <View style={styles.centered}>
            <Logo />
            <Label style={styles.label}>{i18n.t('input.enter_comm_url')}</Label>
            <View style={styles.margin}>
              <Item rounded>
                <Input
                  blurOnSubmit
                  autoFocus
                  onSubmitEditing={this._onPress}
                  underlineColorAndroid="transparent"
                  placeholder="school.edu.ng"
                  onChangeText={this._onTextChange}
                  value={url}
                />
              </Item>
              {
                loading ? <Spinner /> : (
                  <React.Fragment>
                    <Button
                      rounded
                      disabled={loading || !url}
                      block
                      bordered
                      onPress={this._onPress}
                      style={{
                        marginVertical: 8
                      }}
                    >
                      <Text uppercase={false}>{i18n.t('button.enter')}</Text> 
                    </Button>
                    <Button
                      rounded
                      bordered
                      block
                      onPress={this._onPreview}
                    >
                      <Text uppercase={false}>{i18n.t('button.preview')}</Text>
                    </Button>
                  </React.Fragment>
                )
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}