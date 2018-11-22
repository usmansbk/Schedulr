import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
  Caption
} from 'react-native-paper';
import Actions from '../../common/Actions';
import styles from './styles';

const START_TIME = 'hh:mm a';
export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id);
  render() {
    const {
      id,
      title,
      description,
      location,
      date,
      start,
      end,
      repeat,
      allDay,
      type,
      isCancelled,
      starsCount,
      commentsCount,
      starred,
    } = this.props;
    const startTime = moment(start).format(START_TIME);
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <React.Fragment>
          <View style={styles.itemContent}>
            <View style={styles.head}>
              <Headline numberOfLines={1} ellipsizeMode="tail">{title}</Headline>
              <Text style={styles.startTime}>{startTime}</Text>
            </View>
            <View style={styles.body}>
              { Boolean(description) && (
                <Caption
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {description}
                </Caption>)
              }
            </View>
          </View>
          <Actions
            id={id}
            title={title}
            location={location}
            type={type}
            starred={starred}
            starsCount={starsCount}
            commentsCount={commentsCount}
            date={date}
            navigateToComments={this._onPressComment}
            mode="item"
          />
        </React.Fragment>
      </TouchableRipple>
    );
  }
}