import React from 'react';
import { Text } from 'react-native';
import Profile from './Hoc';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:( <Profile
      id={navigation.getParam('id')}
      goBack={() => navigation.goBack()}
    />)
  });

  render() {
    const id = this.props.navigation.getParam('id');
    return <Text>Hello</Text>
  }
}