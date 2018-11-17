import React, { PureComponent } from 'react';
import { StyleSheet, View, PixelRatio } from 'react-native';
import StarButton from '../../../containers/StarButton';
import CommentButton from '../../common/CommentButton';
import MapButton from '../../common/MapButton';
import ShareButton from '../../common/ShareIconButton';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: theme.gray,
  },
  actionbtn: {
    width: 36,
    height: 36,
    margin: 8
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
  }
})

export default class Actions extends PureComponent {
  render() {
    const {
      commentsCount,
      location,
      isStarred,
      id,
      name,
      eventType,
      start,
      end
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <StarButton
            isStarred={isStarred}
            id={id}
          />
          <CommentButton
            commentsCount={commentsCount}
            id={id}
            onPress={this.props.onPressCommentButton}
          />
          <MapButton
            location={location}
          />
          <ShareButton
            id={id}
            name={name}
            location={location}
            eventType={eventType}
            start={start}
            end={end}
          />
        </View>
      </View>
    )
  }
}