import React from 'react';
import { Image } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';

export default class Item extends React.Component {
  shouldComponentUpdate = nextProps => this.props.selected !== nextProps.selected;

  _onPress = () => this.props.onPress(this.props.s3Key);
  _onLongPress = () => this.props.onLongPress(this.props.s3Key);

  render() {
    const { style, source, selected, color } = this.props;
    return (
      <TouchableRipple onPress={this._onPress} onLongPress={this._onLongPress}>
        <Surface style={[{
          elevation: 4,
          margin: 8,
          width: 175
        }, selected ? { borderWidth: 2, borderColor: color } : {}]}>
          <Image source={source} style={{
            height: style.height
          }}/>
        </Surface>
      </TouchableRipple>
    );
  }
}