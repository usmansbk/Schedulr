import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from './ListHoc';

class Bookmarks extends React.Component {
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
            color={stores.themeStore.colors.primary}
            size={24}
            onPress={goBack}
            icon={({ color, size }) => <Icon
              name="arrow-left"
              color={color}
              size={size}
            />}
          />
          <Appbar.Content
            title={I18n.get("BOOKMARKED_BY")}
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

export default inject("stores")(observer(Bookmarks));
