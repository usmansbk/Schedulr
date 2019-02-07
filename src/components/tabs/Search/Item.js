import React from 'react';
import { 
  TouchableRipple,
  Text
} from 'react-native-paper';

export default class Item extends React.PureComponent {
  render() {
    return (
      <TouchableRipple 
        onPress={() => {
          this.props.navigation.navigate('DetailScreen');
        }}
        style={styles.item}>
        <Text style={{fontSize: 22}}>{item}</Text>
      </TouchableRipple>
    )
  }
}