import React from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import List from './ListHoc';

class Followers extends React.Component {
  shouldComponentUpdate = nextProps => nextProps.navigation.isFocused();

  render() {
    const {
      id,
      goBack,
      isOwner,
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
          isOwner={isOwner}
        />
      </>
    )
  }
}

const withStores = inject("stores")(observer(Followers))

export default withNavigationFocus(withStores);