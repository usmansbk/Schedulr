import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Notifications';

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

  render() {
    const { stores } = this.props;

    return (
      <List
        notifications={stores.notifications.items}
        styles={stores.appStyles.notifications}
      />
    )
  }
}

export default withNavigationFocus(Notifications);