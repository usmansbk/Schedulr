import React from 'react';
import { Appbar } from 'react-native-paper';
import styles from '../../../config/styles';
import colors from '../../../config/colors';


export default (props) => (
  <React.Fragment>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={props.goBack} />
      <Appbar.Content
        title="Settings"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
  </React.Fragment>
);