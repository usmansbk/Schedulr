import React from 'react';
import Search, { SearchBar } from './Screen';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <>
      <SearchBar
        navigation={this.props.navigation}
      />
      <Search />
      </>
    )
  }
}