import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import Actions from '../../common/Actions';
import Tag from '../../common/Tag';
import { BULLET } from '../../../lib/constants';
import styles from './styles';

export default ({
  id,
  title,
  date,
  eventType,
  address,
  boardName,
  boardId,
  repeat,
  until,
  createdAt,
  updatedAt,
  description,
  duration,
  timeAgo,
  status,
  isCancelled,
  isStarred,
  starsCount,
  commentsCount,
  navigateToBoard,
  navigateToComments,
}) => (
  <View style={styles.container}>
    <ScrollView style={styles.bg}>
      <View style={styles.content}>
        <View style={styles.head}>
          <View style={styles.headNote}>
            <Tag status={status} />
            {
              !isCancelled && <Text style={styles.note}> {BULLET} {timeAgo}</Text>
            }
          </View> 
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
            <Text style={styles.value}>{address || 'No location set'}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>BOARD</Text>
            <Text onPress={() => navigateToBoard(boardId)} style={[styles.value, styles.nav]}>{boardName}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>REPEAT</Text>
            <Text style={styles.value}>{repeat}</Text>
          </View>
          {
            Boolean(until) && (
              <View style={styles.item}>
                <Text style={styles.label}>UNTIL</Text>
                <Text style={styles.value}>{until}</Text>
              </View>
            )
          }
          <View style={styles.item}>
            <Text style={styles.label}>CREATED</Text>
            <Text style={styles.value}>{createdAt}</Text>
          </View>
          {
            Boolean(updatedAt) && (
              <View style={styles.item}>
                <Text style={styles.label}>EDITED</Text>
                <Text style={styles.value}>{updatedAt}</Text>
              </View>
            )
          }
          <View style={styles.item}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
              <Text style={styles.value}>{description || 'No description'}</Text>
            </Hyperlink>
          </View>
        </View>
      </View>
    </ScrollView>
    <Divider />
    <Actions
      id={id}
      title={title}
      address={address}
      eventType={eventType}
      isStarred={isStarred}
      starsCount={starsCount}
      commentsCount={commentsCount}
      date={date}
      navigateToComments={navigateToComments}
    />
  </View>
);