import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Messages';

class Messages extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  render() {
    const { stores } = this.props;

    return (
      <>
      <List
        styles={stores.appStyles.notifications}
        navigation={this.props.navigation}
      />
      </>
    )
  }
}

const withStores = inject("stores")(observer(Messages));

export default withNavigationFocus(withStores);