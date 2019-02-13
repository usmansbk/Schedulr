import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import { Headline, TouchableRipple } from 'react-native-paper';
import numeral from 'numeral';
import colors from '../../../config/colors';

export default ({
  navigation,
  user: {
    id,
    pictureUrl,
    name,
    followingCount=0,
    createdCount=0,
  }
}) => (
  <ScrollView contentContainerStyle={styles.header}>
    <Image
      source={{uri: pictureUrl}}
      resizeMode="cover"
      style={styles.backgroundImage}
    />
    <Image
      source={{uri: pictureUrl}}
      resizeMode="cover"
      style={styles.image}
    />
    <Headline style={styles.headline}>{name}</Headline>
    <TouchableRipple onPress={() => navigation.push('UserBoards', { id, name})}>
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
    </TouchableRipple>
  </ScrollView>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary_light
  },
  image: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 60 
  },
  backgroundImage: {
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
    paddingHorizontal: 16
  }
})