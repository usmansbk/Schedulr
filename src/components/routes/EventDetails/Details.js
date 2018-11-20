import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Actions from './Actions';
import styles from './styles';

export default ({
  id,
  title,
  date,
  type,
  location,
  groupName,
  groupId,
  repeat,
  createdAt,
  description,
  status,
  starred,
  starsCount,
  commentsCount,
  navigateToGroup,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.head}>
            <Headline style={styles.title}>{title}</Headline>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Divider />
          <View style={styles.body}>
            <View style={styles.item}>
              <Text style={styles.label}>STATUS</Text>
              <Text style={styles.value}>{status}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>TYPE</Text>
              <Text style={styles.value}>{type}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>LOCATION</Text>
              <Text style={styles.value}>{location || 'No location set'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>GROUP</Text>
              <Text onPress={navigateToGroup(groupId)} style={styles.value}>{groupName}</Text>
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
              <Text style={styles.value}>{description || 'No description'}</Text>
            </View>
          </View>
          <Actions
            id={id}
            title={title}
            location={location}
            starred={starred}
            starsCount={starsCount}
            commentsCount={commentsCount}
            date={date}
          />
        </View>
      </View>
    </ScrollView>
  );
}