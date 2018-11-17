import React from 'react';
import { Text, H3 } from 'native-base';
import moment from 'moment';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import capitalizr, { decapitalize } from '../../../lib/capitalizr';
import { getNextDate } from '../../../lib/time';
import text, { ITEM_HEIGHT } from './styles';

const DATE_FORMAT = 'dddd, Do MMM, YYYY hh:mm a';


export default class EventListItem extends React.PureComponent {
  _onPressAvatar = () => {
    const { id, name } = this.props;
    this.props.onPressAvatar({id, name});
  }

  _onPressItem = () => {
    this.props.onPressItem(this.props.id, this.props.name);
  }

  _onPressCommentButton = () => {
    this.props.onPressComment(this.props.id, this.props.name);
  }

  render() {
    const {
      name,
      eventType,
      start,
      end,
      repeat
    } = this.props;

    const parsedEnd = Date.parse(end);
    const isEnded = Date.now() > parsedEnd;
    const parsedStart = getNextDate(start, repeat, undefined, isEnded);
  
    const duration = moment(parsedEnd).from(parsedStart, true);
    const startTime = moment(parsedStart).format(DATE_FORMAT);
  
    return (
      <TouchableNativeFeedback
        onPress={this._onPressItem}
      >
        <View style={styles.container}>
          <View style={styles.content}>
          <View style={styles.body}>
            <View>
              <H3 style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</H3>
            </View>
            <View>
              <Text note>
              {capitalizr(duration)} {decapitalize(eventType, true)} { repeat !== 'ONCE' && decapitalize(repeat, true)}
              </Text>
              <Text style={text.textStyle}>{startTime}</Text>
            </View>
          </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: ITEM_HEIGHT
  },
  content: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    color: '#404040'
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
     marginRight: 8
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-between'
  },
  marginVertical: {
    marginVertical: 8
  },
  reactions: {
    alignSelf: 'flex-end'
  }
})