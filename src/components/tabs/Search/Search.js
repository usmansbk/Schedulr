import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Tabs from './Tabs';

export default class Search extends React.Component {
  state = {
    query: ''
  }

  _onChangeText = query => this.setState({ query });

  _goBack = () => this.props.navigation.goBack();

  render() {
    return (
      <View style={styles.container}>
        <Searchbar
          icon="arrow-back"
          onIconPress={this._goBack}
          placeholder="Search for..."
          value={this.state.query}
          onChangeText={this._onChangeText}
          style={styles.searchbar}
        />
        <Tabs screenProps={{query: this.state.query}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    elevation: 0
  }
});
