import React from 'react';
import Profile from './Hoc';
import UserBoards from '../UserBoards';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:( <Profile
      id={navigation.getParam('id')}
      goBack={() => navigation.goBack()}
    />)
  });

  render() {
    const id = this.props.navigation.getParam('id');
    return <UserBoards id={id} />
  }
}