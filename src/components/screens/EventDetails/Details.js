import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import numeral from 'numeral';
import moment from 'moment';
import { I18n } from 'aws-amplify';
import { getStatus } from 'lib/formatEvent';
import Actions from 'components/common/Actions';
import Tag from 'components/common/Tag';
import Carousel from 'components/lists/Carousel';

const DATE_ONLY_FORMAT = "ddd DD, MMM YYYY";
const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default inject('stores')(observer(
  ({
    id,
    title,
    date,
    category,
    address,
    scheduleName,
    authorName,
    scheduleId,
    recurrence,
    until,
    createdAt,
    updatedAt,
    description,
    duration,
    startAt,
    endAt,
    isOffline,
    isBookmarked,
    isCancelled,
    cancelledDates,
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
  }) => {
    const [ expandDescription, setExpand ] = useState(false);
    const expandText = () => setExpand(!expandDescription);
    const status= getStatus({
      isCancelled,
      cancelledDates,
      startAt,
      endAt,
      until
    });
    return (
    <View style={stores.appStyles.eventDetails.container}>
      <ScrollView style={stores.appStyles.eventDetails.bg}>
        <View style={stores.appStyles.eventDetails.content}>
          <View style={stores.appStyles.eventDetails.head}>
            <View style={stores.appStyles.eventDetails.headNote}>
              { !cardView && <Tag status={status} /> }
            </View> 
            <Headline style={stores.appStyles.eventDetails.title}>{title}</Headline>
            <Text style={stores.appStyles.eventDetails.date}>{date}</Text>
          </View>
          <Divider />
          <View style={stores.appStyles.eventDetails.body}>
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("DURATION")}</Text>
              <Text style={stores.appStyles.eventDetails.value}>{duration}</Text>
            </View>
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
              <Text style={stores.appStyles.eventDetails.value}>{address || I18n.get("EVENT_noLocationSet")}</Text>
            </View>
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
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("UNTIL")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{moment(until).format(DATE_ONLY_FORMAT)}</Text>
                </View>
              )
            }
            <View style={stores.appStyles.eventDetails.item}>
              <Text style={stores.appStyles.eventDetails.label}>{I18n.get("CREATED")}</Text>
              <Text style={stores.appStyles.eventDetails.value}>{moment(createdAt).format(DATE_FORMAT)}</Text>
            </View>
            {
              Boolean(updatedAt) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>{I18n.get("EDITED")}</Text>
                  <Text style={stores.appStyles.eventDetails.value}>{moment(updatedAt).format(DATE_FORMAT)}</Text>
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
                <Text
                  numberOfLines={expandDescription ? undefined : 2}
                  ellipsizeMode="tail"
                  onPress={expandText}
                  style={stores.appStyles.eventDetails.value}>{description || I18n.get("EVENT_noDescription")}</Text>
              </Hyperlink>
            </View>
            <Carousel
              id={id}
              isOwner={isOwner}
              data={[]}
              banner={pictureUrl}
              navigateToBanner={navigateToBanner}
            />
            {
              (Boolean(bookmarksCount)) && (
                <View style={stores.appStyles.eventDetails.item}>
                  <Text
                    onPress={() => navigateToBookmarks(id)}><Text style={stores.appStyles.eventDetails.date}>{numeral(bookmarksCount).format('0 a')}</Text> {I18n.get("EVENT_interested")}</Text>
                </View>
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
        isOffline={isOffline}
      />
    </View>
  );}
));