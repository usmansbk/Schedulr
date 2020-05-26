import React from 'react';
import { Text } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {

  render() {
    const { stores, marked, label } = this.props;
    const styles = stores.appStyles.customTypes;
    const colors = stores.themeStore.colors;

    return  (
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>{label}</Text>
            { marked && <Icon name="check" size={20} color={colors.primary} /> }
          </View>
        </View>
    )
  }
}

export default inject("stores")(observer(Item));