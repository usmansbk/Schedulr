import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import numeral from 'numeral';
import { I18n } from 'aws-amplify';
import Actions from 'components/common/Actions';
import CountDown from 'components/common/Countdown';
import Tag from 'components/common/Tag';
import Carousel from 'components/lists/Carousel';

export default inject('stores')(observer(
  ({
    id,
    title,
    weekDay,
    date,
    category,
    address,
    scheduleName,
    authorName,
    scheduleId,
    recurrence,
    until,
    firstAt,
    createdAt,
    updatedAt,
    description,
    duration,
    status,
    startAt,
    endAt,
    isCancelled,
    isBookmarked,
    authorId,
    isAuth,
    isOwner,
    bookmarksCount,
    commentsCount,
    pictureUrl,
    navigateToSchedule,
    navigateToComments,
    navigateToUser,
    navigateToBookmarks,
    navigateToBanner,
    cardView,
    stores,
    onFinish
  }) => (
    <View style={stores.appStyles.eventDetails.container}>
      <ScrollView style={stores.appStyles.eventDetails.bg}>
        <View style={stores.appStyles.eventDetails.content}>
          <View style={stores.appStyles.eventDetails.head}>
            { !(cardView || isCancelled) && (
                <CountDown
                  startAt={startAt}
                  endAt={endAt}
                  onFinish={onFinish}
                />
              )
            }
            <View style={stores.appStyles.eventDetails.headNote}>
              { !cardView && <Tag status={status} /> }
            </View> 
            <Headline style={stores.appStyles.eventDetails.title}>{title}</Headline>
            <Text style={stores.appStyles.eventDetails.date}>{weekDay}</Text>
            <Text style={stores.appStyles.eventDetails.date}>{date}</Text>
            {(duration !== I18n.get('A day')) && <Text style={stores.appStyles.eventDetails.date}>{duration}</Text>}
          </View>
          <Divider />
          <View style={stores.appStyles.eventDetails.body}>
            {
              !!category && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("TYPE")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{category}</Text>
                </View>
                )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("VENUE")}</Text>
              <Text style={stores.appStyles.eventDetails.value}>{address || I18n.get("No location set")}</Text>
            </View>
            <Carousel
              id={id}
              isOwner={isOwner}
              data={[]}
              banner={pictureUrl}
              navigateToBanner={navigateToBanner}
            />
            {
              (isAuth && scheduleName) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("SCHEDULE")}</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    onPress={scheduleId && (() => navigateToSchedule(scheduleId))}
                    style={[stores.appStyles.eventDetails.value, stores.appStyles.eventDetails.nav]}>{scheduleName}</Text>
                </View>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("REPEAT")}</Text>
              <Text style={stores.appStyles.eventDetails.value}>{recurrence}</Text>
            </View>
            {
              Boolean(until) && (
                <>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("STARTED")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{firstAt}</Text>
                </View>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("UNTIL")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{until}</Text>
                </View>
                </>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("CREATED")}</Text>
              <Text style={stores.appStyles.eventDetails.value}>{createdAt}</Text>
            </View>
            {
              Boolean(updatedAt) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("EDITED")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{updatedAt}</Text>
                </View>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("AUTHOR")}</Text>
              <Text
                style={[stores.appStyles.eventDetails.value, stores.appStyles.eventDetails.nav]}
                onPress={() => navigateToUser(authorId)}
              >
              {authorName}
              </Text>
            </View>
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("DESCRIPTION")}</Text>
              <Hyperlink linkStyle={stores.appStyles.eventDetails.linkStyle} linkDefault={true}>
                <Text style={stores.appStyles.eventDetails.value}>{description || I18n.get("No description")}</Text>
              </Hyperlink>
            </View>
            {
              (Boolean(bookmarksCount)) && (
                <>
                <Divider />
                <View style={stores.appStyles.eventDetails.item}>
                  <Text onPress={() => navigateToBookmarks(id)}><Text style={stores.appStyles.eventDetails.date}>{numeral(bookmarksCount).format('0 a')}</Text> {I18n.get("BOOKMARKS_COUNT")(bookmarksCount)}</Text>
                </View>
                </>
              )
            }
          </View>
        </View>
      </ScrollView>
      <Divider />
      <Actions
        id={id}
        title={title}
        isAuth={isAuth}
        address={address}
        category={category}
        isBookmarked={isBookmarked}
        bookmarksCount={bookmarksCount}
        bookmarkScheduleId={scheduleId}
        commentsCount={commentsCount}
        color={stores.themeStore.colors.gray}
        activeColor={stores.themeStore.colors.like}
        date={date}
        navigateToComments={navigateToComments}
      />
    </View>
  )
));