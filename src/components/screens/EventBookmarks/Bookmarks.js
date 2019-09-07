import React from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from './ListHoc';

class Bookmarks extends React.Component {
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
        <Appbar style={stores.appStyles.styles.header}>
          <Appbar.Action
            color={stores.themeStore.colors.gray}
            size={24}
            onPress={goBack}
            icon={({ color, size }) => <Icon
              name="arrow-left"
              color={color}
              size={size}
            />}
          />
          <Appbar.Content
            title={I18n.get("Bookmarks")}
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

const withStores = inject("stores")(observer(Bookmarks))

export default withNavigationFocus(withStores);