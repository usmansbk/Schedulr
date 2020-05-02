import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import {CIRCLE, PAGINATION_LIMIT} from 'lib/constants';
import numeral from 'numeral';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  }
})

class Header extends React.Component {
  _onPress = () => this.props.onPress();

  render() {
    const {
      commentsCount = 0,
      currentCount = 0,
      loading 
    } = this.props;
    const previousCommentsCount = commentsCount - currentCount;
    const hasMore = previousCommentsCount > 0;
    let caption = CIRCLE; 
    if (hasMore) {
      caption = I18n.get("COMMENTS_loadMore")(numeral(previousCommentsCount % PAGINATION_LIMIT).format('0b')); 
    }
    return (
      <TouchableRipple onPress={this._onPress} disabled={loading || !hasMore}>
        <View style={styles.container}>
          {
            loading ? <ActivityIndicator size={16}/> : <Caption>{caption}</Caption>
          }
        </View>
      </TouchableRipple>
    );
  }
}

export default Header;