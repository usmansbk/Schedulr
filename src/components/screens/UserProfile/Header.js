import React from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Text
} from 'react-native';
import { Headline, Appbar } from 'react-native-paper';
import numeral from 'numeral';
import colors from '../../../config/colors';

export default ({
  translateOpacity,
  user: {
    pictureUrl,
    name,
    followingCount=0,
    createdCount=0,
  }
}) => (
  <View style={[styles.header]}>
    <Image
      source={{uri: pictureUrl}}
      resizeMode="cover"
      style={[styles.image]}
    />
    <Animated.Image source={{uri: pictureUrl}} resizeMode="cover"
      style={[{ transform: [{ scale: translateOpacity}]}, styles.backgroundImage]}
    />
    <Headline style={styles.headline}>{name}</Headline>
    <View style={styles.countRow}>
      <View style={styles.item}>
        <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
        <Text style={styles.label}>Following</Text>
      </View>
        <View style={styles.item}>
          <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
          <Text style={styles.label}>Created</Text>
        </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  backgroundImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 50 
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5
  },
  headline: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold',
    textAlign: 'center',
    color: colors.white
  },
  count: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 8,
    marginBottom: 4
  },
  label: {
    color: colors.white,
    fontSize: 16,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'blue'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})