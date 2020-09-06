import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Headline, Divider, Caption} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import {inject, observer} from 'mobx-react';
import numeral from 'numeral';
import moment from 'moment';
import {I18n} from 'aws-amplify';
import {getStatus} from 'lib/formatEvent';
import {formatDate, getDuration, getRepeatLabel} from 'lib/time';
import Actions from 'components/common/Actions';
import Tag from 'components/common/Tag';
import Carousel from 'components/lists/Carousel';

const DATE_ONLY_FORMAT = 'ddd DD, MMM YYYY';
const DATE_FORMAT = 'ddd DD, MMM YYYY, hh:mm a';

export default inject('stores')(
  observer(
    ({
      id,
      title,
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
      startAt,
      endAt,
      allDay,
      isMuted,
      isOffline,
      isBookmarked,
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
      stores,
      raw_startAt,
    }) => {
      const [expandDescription, setExpand] = useState(false);
      const expandText = () => setExpand(!expandDescription);

      const date = formatDate(startAt, endAt, allDay);
      const duration = getDuration(startAt, endAt);
      const repeatLabel = getRepeatLabel(recurrence, raw_startAt);
      const status = getStatus({
        cancelledDates,
        startAt,
        endAt,
        until,
      });
      return (
        <View style={stores.styles.eventDetails.container}>
          <ScrollView style={stores.styles.eventDetails.bg}>
            <View style={stores.styles.eventDetails.content}>
              <View style={stores.styles.eventDetails.head}>
                {isMuted && <Caption>{I18n.get('HELPER_TEXT_muted')}</Caption>}
                <View style={stores.styles.eventDetails.headNote}>
                  <Tag status={status} />
                </View>
                <Headline style={stores.styles.eventDetails.title}>
                  {title}
                </Headline>
                <Text style={stores.styles.eventDetails.date}>{date}</Text>
              </View>
              <Divider />
              <View style={stores.styles.eventDetails.body}>
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('DURATION')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {duration}
                  </Text>
                </View>
                {!!category && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text style={stores.styles.eventDetails.label}>
                      {I18n.get('TYPE')}
                    </Text>
                    <Text style={stores.styles.eventDetails.value}>
                      {category}
                    </Text>
                  </View>
                )}
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('VENUE')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {address || I18n.get('EVENT_noLocationSet')}
                  </Text>
                </View>
                {isAuth && scheduleName && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text style={stores.styles.eventDetails.label}>
                      {I18n.get('SCHEDULE')}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      onPress={
                        scheduleId && (() => navigateToSchedule(scheduleId))
                      }
                      style={[
                        stores.styles.eventDetails.value,
                        stores.styles.eventDetails.nav,
                      ]}>
                      {scheduleName}
                    </Text>
                  </View>
                )}
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('REPEAT')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {repeatLabel}
                  </Text>
                </View>
                {Boolean(until) && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text style={stores.styles.eventDetails.label}>
                      {I18n.get('UNTIL')}
                    </Text>
                    <Text style={stores.styles.eventDetails.value}>
                      {moment(until).format(DATE_ONLY_FORMAT)}
                    </Text>
                  </View>
                )}
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('CREATED')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {moment(createdAt).format(DATE_FORMAT)}
                  </Text>
                </View>
                {Boolean(updatedAt) && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text style={stores.styles.eventDetails.label}>
                      {I18n.get('EDITED')}
                    </Text>
                    <Text style={stores.styles.eventDetails.value}>
                      {moment(updatedAt).format(DATE_FORMAT)}
                    </Text>
                  </View>
                )}
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('AUTHOR')}
                  </Text>
                  <Text
                    style={[
                      stores.styles.eventDetails.value,
                      stores.styles.eventDetails.nav,
                    ]}
                    onPress={() => navigateToUser(authorId)}>
                    {authorName}
                  </Text>
                </View>
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('DESCRIPTION')}
                  </Text>
                  <Hyperlink
                    linkStyle={stores.styles.eventDetails.linkStyle}
                    linkDefault={true}>
                    <Text
                      numberOfLines={expandDescription ? undefined : 2}
                      ellipsizeMode="tail"
                      onPress={expandText}
                      style={stores.styles.eventDetails.value}>
                      {description || I18n.get('EVENT_noDescription')}
                    </Text>
                  </Hyperlink>
                </View>
                <Carousel
                  id={id}
                  isOwner={isOwner}
                  data={[]}
                  banner={pictureUrl}
                  navigateToBanner={navigateToBanner}
                />
                {Boolean(isOwner && bookmarksCount) && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text onPress={() => navigateToBookmarks(id)}>
                      <Text style={stores.styles.eventDetails.date}>
                        {numeral(bookmarksCount).format('0 a')}
                      </Text>{' '}
                      {I18n.get('EVENT_interested')}
                    </Text>
                  </View>
                )}
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
            color={stores.theme.colors.gray}
            activeColor={stores.theme.colors.like}
            date={date}
            navigateToComments={navigateToComments}
            isOffline={isOffline}
          />
        </View>
      );
    },
  ),
);
