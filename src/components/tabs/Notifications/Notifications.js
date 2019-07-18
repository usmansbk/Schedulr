import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Notifications';

@inject('stores')
@observer
class Notifications extends React.Component {
  componentDidMount = () => {
    this.props.stores.notifications.toggleRead();
  };

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  render() {
    const { stores } = this.props;

    return (
      <List
        notifications={stores.notifications.items}
      />
    )
  }
}

export default withNavigationFocus(Notifications);