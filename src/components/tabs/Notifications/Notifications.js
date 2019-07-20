import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Notifications';
import Fab from 'components/common/Fab';

@inject('stores')
@observer
class Notifications extends React.Component {
  componentDidUpdate = () => {
    this.props.stores.notifications.process();
  }
  
  componentDidMount = () => {
    this.props.stores.notifications.process();
  };

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  _onPress = () => {
    this.props.stores.notifications.reset();
  }

  render() {
    const { stores } = this.props;

    return (
      <>
      <List
        notifications={stores.notifications.items}
        styles={stores.appStyles.notifications}
      />
      <Fab
        small
        icon="clear-all"
        onPress={this._onPress}
      />
      </>
    )
  }
}

export default withNavigationFocus(Notifications);