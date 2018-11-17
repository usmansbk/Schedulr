import React from 'react';
import { View } from 'react-native';
import Groups from '../../../containers/SearchGroup';
import styles from './styles';

export default class GroupSearch extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Groups name={this.props.name} online={this.props.isConnected} />
      </View>
    )
  }
}