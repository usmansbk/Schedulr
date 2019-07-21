import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Logs
import Fab from 'components/common/Fab';

@inject('stores')
@observer
class Logs extends React.Component {
  componentDidUpdate = () => {
    this.props.stores.logs.process();
  }
  
  componentDidMount = () => {
    this.props.stores.logs.process();
  };

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  _onPress = () => {
    this.props.stores.logs.reset();
  }

  render() {
    const { stores } = this.props;

    return (
      <>
      <List
        logs={stores.logs.items.sort((a, b) => (b.date - a.date))}
        styles={stores.appStyles.logs}
        navigation={this.props.navigation}
      />
      {
        Boolean(stores.logs.items.length) && (
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

export default withNavigationFocus(Logs);