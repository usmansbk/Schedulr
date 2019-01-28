import React from 'react';
import { Appbar } from 'react-native-paper';
import Tabs from './Tabs';
import colors from '../../../config/colors';
import styles from '../../../config/styles';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <React.Fragment>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.BackAction color={colors.gray} onPress={this._goBack} />
          <Appbar.Content title="Boards" titleStyle={styles.headerColor} />
        </Appbar.Header>
        <Tabs screenProps={{ id }} />
      </React.Fragment>
    )
  }
}