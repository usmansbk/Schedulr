import React from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from './ListHoc';

@inject("stores")
@observer
class Followers extends React.Component {
  componentWillUpdate = nextProps => nextProps.navigation.isFocused();

  render() {
    const {
      id,
      goBack,
      isAuthor,
      stores
    } = this.props;

    return  (
      <>
        <Appbar style={stores.appStyles.styles.elevatedHeader}>
          <Appbar.BackAction onPress={goBack} color={stores.themeStore.colors.gray} />
          <Appbar.Content
            title="Followers"
            titleStyle={stores.appStyles.styles.headerColor}
          />
        </Appbar>
        <List
          id={id}
          isAuthor={isAuthor}
        />
      </>
    )
  }
}

export default withNavigationFocus(Followers);