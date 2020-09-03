import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Headline, Divider, Appbar} from 'react-native-paper';
import Hyperlink from 'react-native-hyperlink';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Confirm from 'components/common/Confirm';
import Error from 'components/common/Error';
import Tag from 'components/common/Tag';
import Suspense from 'components/common/Suspense';
import {formatDate, getDuration, getRepeatLabel} from 'lib/time';
import {getStatus} from 'lib/formatEvent';

class CalendarEvent extends React.Component {
  state = {
    event: null,
    display: false,
  };

  _deleteConfirmRef = (ref) => (this.deleteConfirmRef = ref);

  _goBack = () => this.props.navigation.goBack();

  _onRemoveEvent = async () => {
    await this.props.stores.calendar.removeEvent(
      this.props.navigation.getParam('id'),
    );
    this.props.navigation.goBack();
  };

  _removeEvent = () => this.deleteConfirmRef.open();

  componentDidMount = () => {
    const id = this.props.navigation.getParam('id');
    const event = this.props.stores.calendar.findEventById(id);
    setTimeout(
      () =>
        this.setState({
          event,
          display: true,
        }),
      0,
    );
    this.setState({event});
  };

  render() {
    const {event, display} = this.state;
    if (!display) return <Suspense />;

    const {stores} = this.props;
    const colors = stores.theme.colors;
    const styles = stores.appStyles.styles;

    if (!event)
      return (
        <Error
          notFound
          message={I18n.get('ERROR_404')}
          caption={I18n.get('ERROR_404_caption')}
        />
      );

    const {
      title,
      startAt,
      endAt,
      allDay,
      recurrence,
      venue: address,
      schedule: {name: scheduleName},
      description,
      until,
      author,
    } = event;

    const repeatLabel = getRepeatLabel(recurrence, startAt);
    const date = formatDate(startAt, endAt, allDay);
    const duration = getDuration(startAt, endAt);
    const status = getStatus({
      startAt,
      endAt,
    });

    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            onPress={this._goBack}
            color={colors.primary}
            size={24}
            icon={({color, size}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
          <Appbar.Content titleStyle={styles.headerColor} />
          <Appbar.Action
            onPress={this._removeEvent}
            color={colors.light_red}
            size={24}
            icon={({color, size}) => (
              <Icon name="trash" color={color} size={size} />
            )}
          />
        </Appbar.Header>
        <View style={stores.appStyles.eventDetails.container}>
          <ScrollView style={stores.appStyles.eventDetails.bg}>
            <View style={stores.appStyles.eventDetails.content}>
              <View style={stores.appStyles.eventDetails.head}>
                <View style={stores.appStyles.eventDetails.headNote}>
                  <Tag status={status} />
                </View>
                <Headline style={stores.appStyles.eventDetails.title}>
                  {title}
                </Headline>
                <Text style={stores.appStyles.eventDetails.date}>{date}</Text>
                <Text style={stores.appStyles.eventDetails.date}>
                  {duration}
                </Text>
              </View>
              <Divider />
              <View style={stores.appStyles.eventDetails.body}>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>
                    {I18n.get('VENUE')}
                  </Text>
                  <Text style={stores.appStyles.eventDetails.value}>
                    {address || I18n.get('No location set')}
                  </Text>
                </View>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>
                    {I18n.get('REPEAT')}
                  </Text>
                  <Text style={stores.appStyles.eventDetails.value}>
                    {repeatLabel}
                  </Text>
                </View>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>
                    {I18n.get('CALENDAR')}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={stores.appStyles.eventDetails.value}>
                    {scheduleName}
                  </Text>
                </View>
                <View style={stores.appStyles.eventDetails.item}>
                  <Text style={stores.appStyles.eventDetails.label}>
                    {I18n.get('SOURCE')}
                  </Text>
                  <Text style={stores.appStyles.eventDetails.value}>
                    {author.name || I18n.get('Calendar')}
                  </Text>
                </View>
                {Boolean(until) && (
                  <View style={stores.appStyles.eventDetails.item}>
                    <Text style={stores.appStyles.eventDetails.label}>
                      {I18n.get('UNTIL')}
                    </Text>
                    <Text style={stores.appStyles.eventDetails.value}>
                      {until}
                    </Text>
                  </View>
                )}
                {Boolean(description && description.trim()) && (
                  <View style={stores.appStyles.eventDetails.item}>
                    <Text style={stores.appStyles.eventDetails.label}>
                      {I18n.get('DESCRIPTION')}
                    </Text>
                    <Hyperlink
                      linkStyle={stores.appStyles.eventDetails.linkStyle}
                      linkDefault={true}>
                      <Text style={stores.appStyles.eventDetails.value}>
                        {description || I18n.get('No description')}
                      </Text>
                    </Hyperlink>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <Confirm
            onConfirm={this._onRemoveEvent}
            title={I18n.get('DIALOG_deleteEvent')}
            message={I18n.get('WARNING_deleteCalendarEvent')}
            ref={this._deleteConfirmRef}
          />
        </View>
      </>
    );
  }
}

export default inject('stores')(observer(CalendarEvent));
