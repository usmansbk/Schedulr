import React from 'react';
import { 
  TouchableRipple,
  Text
} from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class Item extends React.PureComponent {
  render() {
    const styles = this.props.stores.appStyles.explore;
    
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