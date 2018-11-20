import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import styles from './styles';

export default ({
  title='(No title)',
  date=`Tuesday, 20 November\n02:30 - 03:30`,
  type='Work',
  location='No location set',
  groupName='Dev Mode',
  repeat='Never',
  createdAt='Nov 20, 2018',
  description='No description',
  status='Ongoing'
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.head}>
            <Headline style={styles.title}>{title}</Headline>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.status}>{status}</Text>
          </View>
          <Divider />
          <View style={styles.body}>
            <View style={styles.item}>
              <Text style={styles.label}>TYPE</Text>
              <Text style={styles.value}>{type}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>LOCATION</Text>
              <Text style={styles.value}>{location}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>GROUP</Text>
              <Text style={styles.value}>{groupName}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>REPEAT</Text>
              <Text style={styles.value}>{repeat}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>CREATED</Text>
              <Text style={styles.value}>{createdAt}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>DESCRIPTION</Text>
              <Text style={styles.value}>{description}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}