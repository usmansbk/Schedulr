import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import CountDown from 'components/common/Countdown';


class CalendarEvent extends React.Component {
  state = {
    event: {
      title: 'demo',
      startAd: moment().toISOString(),
      scheduleName: 'usmansbk@gmail.com',
      authorName: 'usmansbk@gmail.com'
    }
  };

  render() {
    const { stores } = this.props;
    const { event } = this.state;
    const {
      title,
      startAt,
      endAt,
      address,
      scheduleName,
      authorName,
      recurrence,
      description,
      until
    } = event;
    const date = moment(startAt).calendar();

    return (
      <View style={stores.appStyles.eventDetails.container}>
        <ScrollView style={stores.appStyles.eventDetails.bg}>
          <View style={stores.appStyles.eventDetails.content}>
            <View style={stores.appStyles.eventDetails.head}>
              <CountDown
                startAt={startAt}
                endAt={endAt}
              />
              <View style={stores.appStyles.eventDetails.headNote}>
              </View> 
              <Headline style={stores.appStyles.eventDetails.title}>{title}</Headline>
              <Text style={stores.appStyles.eventDetails.date}>{date}</Text>
            </View>
            <Divider />
            <View style={stores.appStyles.eventDetails.body}>
              <View style={stores.appStyles.eventDetails.item}>
                <Text style={stores.appStyles.eventDetails.label}>{I18n.get("VENUE")}</Text>
                <Text style={stores.appStyles.eventDetails.value}>{address || I18n.get("No location set")}</Text>
              </View>
              <View style={stores.appStyles.eventDetails.item}>
                <Text style={stores.appStyles.eventDetails.label}>{I18n.get("SCHEDULE")}</Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={stores.appStyles.eventDetails.value}>{scheduleName}</Text>
              </View>
              {
                Boolean(recurrence) && (
                  <View style={stores.appStyles.eventDetails.item}>
                    <Text style={stores.appStyles.eventDetails.label}>{I18n.get("REPEAT")}</Text>
                    <Text style={stores.appStyles.eventDetails.value}>{recurrence}</Text>
                  </View>
                )
              }
              {
                Boolean(until) && (
                  <View style={stores.appStyles.eventDetails.item}>
                    <Text style={stores.appStyles.eventDetails.label}>{I18n.get("UNTIL")}</Text>
                    <Text style={stores.appStyles.eventDetails.value}>{until}</Text>
                  </View>
                )
              }
              <View style={stores.appStyles.eventDetails.item}>
                <Text style={stores.appStyles.eventDetails.label}>{I18n.get("AUTHOR")}</Text>
                <Text
                  style={stores.appStyles.eventDetails.value}
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
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default inject("stores")(observer(CalendarEvent));