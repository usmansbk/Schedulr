import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Caption} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {I18n} from 'aws-amplify';
import BookmarkButton from 'components/common/BookmarkButton';
import {inject, observer} from 'mobx-react';

class Item extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    const {id, stores} = this.props;
    const styles = stores.styles.bookmarkedEventsList;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.unavailableItemContent}>
          <Caption numberOfLines={1} ellipsizeMode="tail">
            <Icon name="alert" size={16} />{' '}
            {I18n.get('This event is unavailable')}
          </Caption>
          <View style={{justifyContent: 'center'}}>
            <BookmarkButton
              id={id}
              isBookmarked
              color={stores.theme.colors.light_gray_3}
              activeColor={stores.theme.colors.like}
              size={18}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
