import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
} from 'react-native-paper';
import Icon from 'components/common/Icon';
import { I18n } from 'aws-amplify';
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
        <View style={styles.unavailableItemContent}>
          <Caption
            numberOfLines={1}
            ellipsizeMode="tail">
            <Icon name="alert" size={16} /> {I18n.get("This event is unavailable")} 
          </Caption>
          <View style={{justifyContent: 'center'}}>        
            <BookmarkButton
              id={id}
              isBookmarked
              color={stores.themeStore.colors.light_gray_3}
              activeColor={stores.themeStore.colors.like}
              size={18}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));