import React from 'react';
import { View } from 'react-native';
import Events from '../../../containers/SearchEvent';
import styles from './styles';

export default class EventSearch extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Events name={this.props.name} online={this.props.isConnected} />
      </View>
    )
  }
}