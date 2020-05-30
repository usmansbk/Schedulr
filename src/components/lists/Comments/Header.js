import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import {PAGINATION_LIMIT} from 'lib/constants';
import numeral from 'numeral';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  }
})

class Header extends React.Component {
  _onPress = () => setTimeout(this.props.onPress, 0);

  render() {
    const {
      commentsCount = 0,
      currentCount = 0,
      loading,
      disabled
    } = this.props;

    const previousCommentsCount = Math.abs(commentsCount - currentCount);
    const hasMore = previousCommentsCount > 0;
    const caption = I18n.get("COMMENTS_loadMore")(numeral(previousCommentsCount % PAGINATION_LIMIT).format('0 a')); 
    return (
      <TouchableOpacity onPress={this._onPress} disabled={disabled || loading || !hasMore}>
        <View style={styles.container}>
          {
            loading ? <ActivityIndicator size={16}/> : (
            hasMore ? <Caption>{caption}</Caption> : null
            )
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export default Header;