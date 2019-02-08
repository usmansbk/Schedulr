import React from 'react';
import {
  Appbar,
  Text
} from 'react-native-paper';
import Tabs from './Tabs';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default class UserBoardsScreen extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    const title = this.props.navigation.getParam('title');

    return (
      <React.Fragment>
        <Appbar.Header style={appStyles.header} collapsable>
          <Appbar.BackAction
            onPress={this._goBack}
            color={colors.gray}
          />
          <Appbar.Content
            title={title || 'More'}
            style={appStyles.headerColor}
          />
        </Appbar.Header>
        <Tabs screenProps={{id}}/>
      </React.Fragment>
    )
  }
}