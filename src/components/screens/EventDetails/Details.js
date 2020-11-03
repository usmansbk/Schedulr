import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Headline, Divider} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import {inject, observer} from 'mobx-react';
import numeral from 'numeral';
import {I18n} from 'aws-amplify';
import {getStatus} from 'lib/formatEvent';
import {formatDate, getDuration, getRepeatLabel} from 'lib/time';
import {format} from 'lib/date';
import Actions from 'components/common/Actions';
import Tag from 'components/common/Tag';
import Banner from 'components/common/Banner';
import PhotosCard from 'components/common/PhotosCard';

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
      stores,
    }) => {
      const [expandDescription, setExpand] = useState(false);
      const expandText = () => setExpand(!expandDescription);

      const date = formatDate(startAt, endAt, allDay);
      const duration = getDuration(startAt, endAt);
      const repeatLabel = getRepeatLabel(recurrence, startAt);
      const status = getStatus({
        isCancelled,
        cancelledDates,
        startAt,
        endAt,
        until,
      });
      return (
        <View style={stores.styles.eventDetails.container}>
          <ScrollView style={stores.styles.eventDetails.bg}>
            {(pictureUrl || isOwner) && (
              <Banner
                id={id}
                isOwner={isOwner}
                pictureUrl={pictureUrl}
                navigateToBanner={navigateToBanner}
              />
            )}
            <View style={stores.styles.eventDetails.content}>
              <View style={stores.styles.eventDetails.head}>
                {isCancelled && (
                  <View style={stores.styles.eventDetails.headNote}>
                    <Tag status={status} />
                  </View>
                )}
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
                      {format(until, DATE_ONLY_FORMAT)}
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
                    {I18n.get('CREATED')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {format(createdAt, DATE_FORMAT)}
                  </Text>
                </View>
                {Boolean(updatedAt) && (
                  <View style={stores.styles.eventDetails.item}>
                    <Text style={stores.styles.eventDetails.label}>
                      {I18n.get('EDITED')}
                    </Text>
                    <Text style={stores.styles.eventDetails.value}>
                      {format(updatedAt, DATE_FORMAT)}
                    </Text>
                  </View>
                )}
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('DESCRIPTION')}
                  </Text>
                  <Hyperlink
                    linkStyle={stores.styles.eventDetails.linkStyle}
                    linkDefault={true}>
                    <Text
                      numberOfLines={expandDescription ? undefined : 10}
                      ellipsizeMode="tail"
                      onPress={expandText}
                      style={stores.styles.eventDetails.value}>
                      {description || I18n.get('EVENT_noDescription')}
                    </Text>
                  </Hyperlink>
                </View>
                <PhotosCard id={id} isOwner={isOwner} />
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
