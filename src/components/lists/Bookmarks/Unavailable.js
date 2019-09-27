import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
} from 'react-native-paper';
import BookmarkButton from 'components/common/BookmarkButton';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {

  shouldComponentUpdate = () => false;

  render() {
    const {
      id,
      stores
    } = this.props;
    const styles = stores.appStyles.bookmarkedEventsList;

    return (
      <TouchableRipple style={styles.itemContainer}>
        <View useNativeDriver style={styles.unavailableItemContent}>
          <View style={styles.left}>
            <View style={styles.itemBody}>
              <Caption
                style={styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                This event was deleted
              </Caption>
            </View>
          </View>
          <View style={styles.right}>
            <BookmarkButton
              id={id}
              isBookmarked
              color={stores.themeStore.colors.light_gray_3}
              activeColor={stores.themeStore.colors.like}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));