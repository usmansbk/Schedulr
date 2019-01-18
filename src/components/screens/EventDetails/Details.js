import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Actions from '../../common/Actions';
import styles from './styles';

export default ({
  id,
  title,
  date,
  nextDate,
  eventType,
  location,
  latitude,
  longitude,
  boardName,
  boardId,
  repeat,
  createdAt,
  updatedAt,
  description,
  duration,
  startAgo,
  isCancelled,
  isStarred,
  starsCount,
  commentsCount,
  navigateToBoard,
  navigateToComments,
}) => (
  <React.Fragment>
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.head}>
          { isCancelled ? <Text style={[styles.date, styles.red]}>Cancelled</Text> : 
            <Text style={styles.date}>{startAgo}</Text>
          }
          <Headline style={styles.title}>{title}</Headline>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.date}>{duration}</Text>
        </View>
        <Divider />
        <View style={styles.body}>
          <View style={styles.item}>
            <Text style={styles.label}>TYPE</Text>
            <Text style={styles.value}>{eventType}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>VENUE</Text>
            <Text style={styles.value}>{location || 'No location set'}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>BOARD</Text>
            <Text onPress={() => navigateToBoard(boardId)} style={[styles.value, styles.nav]}>{boardName}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>REPEAT</Text>
            <Text style={styles.value}>{repeat}{ nextDate ? ` - ${nextDate}` : ''}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>CREATED</Text>
            <Text style={styles.value}>{createdAt}</Text>
          </View>
          {
            Boolean(updatedAt) && (
              <View style={styles.item}>
                <Text style={styles.label}>UPDATED</Text>
                <Text style={styles.value}>{updatedAt}</Text>
              </View>
            )
          }
          <View style={styles.item}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <Text style={styles.value}>{description || 'No description'}</Text>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  <Divider />
  <Actions
    id={id}
    title={title}
    location={location}
    latitude={latitude}
    longitude={longitude}
    eventType={eventType}
    isStarred={isStarred}
    starsCount={starsCount}
    commentsCount={commentsCount}
    date={date}
    navigateToComments={navigateToComments}
  />
  </React.Fragment>
);