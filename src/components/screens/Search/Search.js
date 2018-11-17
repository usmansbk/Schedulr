import React, { PureComponent } from 'react';
import {
  Tab,
  Tabs,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from 'native-base';
import Firebase from 'react-native-firebase';
import {
  NetInfo,
  View,
} from 'react-native';
import Groups from './Groups';
import Events from './Events';
import i18n from '../../../config/i18n';
import styles from './styles';

export default class SearchBar extends PureComponent {
  state = {
    isConnected: true,
    search: ''
  }
  
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _handleFirstConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  }

  _goBack = () => this.props.navigation.goBack();

  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('search');
    NetInfo.isConnected.fetch().then(isConnected => this.setState({ isConnected }));
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  componentWillUnmount = () => {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _handleChange = (search) => this.setState({ search });

  render() {
    const { isConnected, search } = this.state;

    return (
      <View style={styles.container}>
        <Header rounded searchBar hasTabs>     
          <Item>
            <Icon
              name='search'
              type="Feather"
            />
            <Input
              autoFocus
              placeholder={i18n.t('search.placeholder')}
              onChangeText={this._handleChange}
            />
          </Item>
          <Button
            transparent
            onPress={this._goBack}
          >
            <Text>Cancel</Text>
          </Button>
        </Header>
        <Tabs>
          <Tab heading={i18n.t('tabs.groups')}>
            <Groups name={search} online={isConnected} />
          </Tab>
          <Tab heading={i18n.t('tabs.events')}>
            <Events name={search} online={isConnected} />
          </Tab>
        </Tabs>
      </View>
    )
  }
}