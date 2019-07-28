import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Updates';
import Fab from 'components/common/Fab';

class Updates extends React.Component {
  componentDidUpdate = () => {
    this.props.stores.updates.process();
  }
  
  componentDidMount = () => {
    this.props.stores.updates.process();
  };

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  _onPress = () => {
    this.props.stores.updates.reset();
  }

  render() {
    const { stores } = this.props;

    return (
      <>
      <List
        updates={stores.updates.items.sort((a, b) => (b.date - a.date))}
        styles={stores.appStyles.notifications}
        navigation={this.props.navigation}
      />
      {
        Boolean(stores.updates.items.length) && (
          <Fab
            small
            icon="clear-all"
            onPress={this._onPress}
          />
        )
      }
      </>
    )
  }
}

const withStores = inject("stores")(observer(Updates));

export default withNavigationFocus(withStores);