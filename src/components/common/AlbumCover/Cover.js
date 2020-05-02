import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Badge } from 'react-native-paper';
import getImageUrl from 'helpers/getImageUrl';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 4,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4
  },
  badge: {
    margin: 4,
    position: 'absolute',
    bottom: 0,
    right: 0
  }
});

export default class Cover extends React.Component {
  render() {
    const { images } = this.props;
    const sources = images.map(img => ({ uri: getImageUrl(img, 320)}))
    return (
      <>
      <View style={styles.container}>
        {
          sources.slice(0, 4).map(img => (
            <Image
              defaultSource={require('../../../assets/placeholder.png')}
              style={styles.image}
              source={img}
            />
          ))
        }
      </View>
      { Boolean(images.length) && (
          <Badge style={styles.badge}>{images.length}</Badge>)
      }
      </>
    )
  }
}