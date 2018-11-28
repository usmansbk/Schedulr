import React from 'react';
import {} from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './styles';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default ({
  goBack
}) => (
  <React.Fragment>
    <Appbar.Header style={appStyles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={goBack} />
      <Appbar.Content
        title="Profile"
        titleStyle={appStyles.headerColor}
      />
    </Appbar.Header>
  </React.Fragment>
);
