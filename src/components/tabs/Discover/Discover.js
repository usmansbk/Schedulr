import React from 'react';
import { inject, observer } from 'mobx-react';
import List from './ListHoc';

class Discover extends React.Component {
  
  componentDidMount = async () => await this.props.stores.locationStore.fetchLocation(true);

  render() {
    return (
      <List
        location={this.props.stores.locationStore.point}
      />
    )
  }
}

export default inject("stores")(observer(Discover));