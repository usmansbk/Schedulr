import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { album } from 'lib/constants';

const { ITEM_WIDTH } = album

export default class Item extends React.Component {
  shouldComponentUpdate = nextProps => this.props.selected !== nextProps.selected;

  _onPress = () => this.props.onPress(this.props.s3Key);
  _onLongPress = () => this.props.onLongPress(this.props.s3Key);

  render() {
    const { style, source, selected, color } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}>
        <Surface style={[{
          elevation: 4,
          margin: 8,
          width: ITEM_WIDTH, 
        }, selected ? { borderWidth: 2, borderColor: color } : {}]}>
          <Image
            source={source}
            defaultSource={require('../../../assets/placeholder.png')}
            style={{
              height: style.height
            }}
          />
        </Surface>
      </TouchableOpacity>
    );
  }
}