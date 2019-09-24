import React from 'react';
import { 
  TouchableRipple,
  Text
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  render() {
    const styles = this.props.stores.appStyles.discover;
    
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

export default inject("stores")(observer(Item));