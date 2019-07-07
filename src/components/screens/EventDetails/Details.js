import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import Actions from 'components/common/Actions';
import Tag from 'components/common/Tag';
import { BULLET } from 'lib/constants';

export default inject('stores')(observer(
  ({
    id,
    title,
    weekDay,
    date,
    eventType,
    address,
    boardName,
    boardId,
    repeat,
    until,
    firstAt,
    createdAt,
    updatedAt,
    description,
    duration,
    timeAgo,
    status,
    isCancelled,
    isStarred,
    isAuthor,
    isFollowing,
    isPublic,
    starsCount,
    commentsCount,
    navigateToBoard,
    navigateToComments,
    cardView,
    stores
  }) => (
    <View style={stores.appStyles.eventDetails.container}>
      <ScrollView style={stores.appStyles.eventDetails.bg}>
        <View style={stores.appStyles.eventDetails.content}>
          <View style={stores.appStyles.eventDetails.head}>
            <View style={stores.appStyles.eventDetails.headNote}>
              {
                !cardView && (
                  <>
                    <Tag status={status} />
                    {!isCancelled && <Text style={stores.appStyles.eventDetails.note}> {BULLET} {timeAgo}</Text>}
                  </>
                )
              }
            </View> 
            <Headline style={stores.appStyles.eventDetails.title}>{title}</Headline>
            <Text style={stores.appStyles.eventDetails.date}>{weekDay}</Text>
            <Text style={stores.appStyles.eventDetails.date}>{date}</Text>
            {(duration !== 'A day') && <Text style={stores.appStyles.eventDetails.date}>{duration}</Text>}
          </View>
          <Divider />
          <View style={stores.appStyles.eventDetails.body}>
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>TYPE</Text>
              <Text style={stores.appStyles.eventDetails.value}>{isPublic ? "Public" : "Private"} {BULLET} {eventType}</Text>
            </View>
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>VENUE</Text>
              <Text style={stores.appStyles.eventDetails.value}>{address || 'No location set'}</Text>
            </View>
            {
              Boolean(boardId) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>SCHEDULE</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    onPress={boardId && (() => navigateToBoard(boardId, (isFollowing || isAuthor)))}
                    style={[stores.appStyles.eventDetails.value, stores.appStyles.eventDetails.nav]}>{boardName}</Text>
                </View>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>REPEAT</Text>
              <Text style={stores.appStyles.eventDetails.value}>{repeat}</Text>
            </View>
            {
              Boolean(until) && (
                <>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>STARTED</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{firstAt}</Text>
                </View>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>UNTIL</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{until}</Text>
                </View>
                </>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>CREATED</Text>
              <Text style={stores.appStyles.eventDetails.value}>{createdAt}</Text>
            </View>
            {
              Boolean(updatedAt) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>EDITED</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{updatedAt}</Text>
                </View>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>DESCRIPTION</Text>
              <Hyperlink linkStyle={stores.appStyles.eventDetails.linkStyle} linkDefault={true}>
                <Text style={stores.appStyles.eventDetails.value}>{description || 'No description'}</Text>
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
  )
));