import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Header,
  Body,
  Left,
  Right,
  Icon,
  Container,
} from 'native-base';
import Firebase from 'react-native-firebase';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Details from './Details';
import IconButton from '../../common/IconButton';
import AddToCalendarButton from '../../../containers/CalendarButton';
import i18n from '../../../config/i18n';
import styles from './styles';
import { decapitalize } from '../../../lib/capitalizr';

const DeleteEventPath = '../../../containers/modals/DeleteEvent';
const CancelEventPath = '../../../containers/modals/CancelEvent';

const optionWrapper = {
  paddingLeft: 16,
  paddingTop: 12,
  paddingBottom: 12,
};

const optionText = {
  fontSize: 16,
  color: 'black'
};

let DeleteEvent = null;
let CancelEvent = null;

class EventCard extends Component {
  
  componentDidMount = () => Firebase.analytics().setCurrentScreen('event_card');

  state = {
    visibleModal: null,
    isVisible: false
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextState.visibleModal !== this.state.visibleModal ||
      nextState.isVisible !== this.state.isVisible ||
      nextProps.event.commentsCount !== this.props.event.commentsCount ||
      nextProps.event.isStarred !== this.props.event.isStarred ||
      nextProps.event.name !== this.props.event.name ||
      nextProps.event.description !== this.props.event.description ||
      nextProps.event.location !== this.props.event.location ||
      nextProps.event.eventType !== this.props.event.eventType ||
      nextProps.event.start !== this.props.event.start ||
      nextProps.event.end !== this.props.event.end ||
      nextProps.event.isCancelled !== this.props.event.isCancelled ||
      nextProps.event.repeat !== this.props.event.repeat ||
      nextProps.event.calendarId !== this.props.event.calendarId
    );
  }

  handleClose = () => this.setState({ visibleModal: null });

  handleReminderClose = () => this.setState({ isVisible: false });

  _openReminder = () => this.setState({ isVisible: true });

  _onBack = () => this.props.navigation.pop();

  _onDelete = () => this.handleSelect('delete');

  handleSelect = (value) => {
    const id = this.props.navigation.getParam('id');
    if (value === 'edit') {
      this.props.navigation.navigate('EditEvent', { id, title: i18n.t('screens.edit_event'), action: 'edit' });
    } else if (value === 'reschdl') {
      this.props.navigation.navigate('Reschdl', { id, title: i18n.t('screens.new_event'), action: 'reschdl' });
    } else {
      this.setState({ visibleModal: value })
    }
  }

  render() {
    const { visibleModal } = this.state;
    const {
      event,
    } = this.props;

    const {
      id,
      isAuthor,
      name,
      eventType,
      location,
      start,
      end,
      calendarId,
      isCancelled,
      repeat,
      description,
      commentsCount,
      isStarred,
      isMember,
      createdAt,
      group
    } = event;
    const isEnded = Date.now() > Date.parse(end);

    let menuItems = [];
    
    if (isAuthor) {
      menuItems = [
        {text: i18n.t('menu.new'), value: "reschdl"}
      ];
  
      if (!isCancelled && !isEnded) {
        menuItems = menuItems.concat([
          {text: i18n.t('menu.edit'), value: 'edit'},
          {text: i18n.t('menu.cancel'), value: "cancel"}
        ]);
      }
    }

    if (isAuthor) {
      DeleteEvent = require(DeleteEventPath).default;
      CancelEvent = require(CancelEventPath).default;
    }

    return (
      <Container>
        <Header>
          <Left>
            <IconButton
              onPress={this._onBack}
              name="arrow-left"
              type="Feather"
            />
          </Left>
          <Body />
          <Right>
            <IconButton
              onPress={this._onDelete}
              name="trash"
              type="Feather"
            />
            {
              !isCancelled && !isEnded && (
                <AddToCalendarButton
                  id={id}
                  title={name}
                  description={description}
                  startDate={Date.parse(start)}
                  endDate={Date.parse(end)}
                  notes={eventType}
                  recurrence={decapitalize(repeat, true)}
                  location={location}
                  calendarId={calendarId}
                />
              )
            }
            {isAuthor && <Menu
              onSelect={this.handleSelect}
            >
              <MenuTrigger
                customStyles={{
                  triggerWrapper: styles.menuButton,
                  TriggerTouchableComponent: TouchableNativeFeedback,
                  triggerTouchable: {
                    background: TouchableNativeFeedback.SelectableBackgroundBorderless()
                  }
                }}
              >
                <Icon style={styles.icon} name="more-vertical" type="Feather" />
              </MenuTrigger>
              <MenuOptions>
                {
                  menuItems.map(item => (
                    <MenuOption
                      key={item.value}
                      text={item.text}
                      value={item.value}
                      customStyles={{
                      optionWrapper,
                      optionText
                    }}
                  />
                  ))
                }
              </MenuOptions>
            </Menu>}
          </Right>
        </Header>
        <Details
          id={id}
          name={name}
          description={description}
          eventType={eventType}
          location={location}
          repeat={repeat}
          isCancelled={isCancelled}
          start={start}
          end={end}
          createdAt={createdAt}
          isStarred={isStarred}
          isMember={isMember}
          commentsCount={commentsCount}
          groupId={group.id}
          groupName={group.name}
          groupDesc={group.description}
        />
        {
          isAuthor && (
            <React.Fragment>
              <DeleteEvent
                id={id}
                name={name}
                groupId={group.id}
                isVisible={visibleModal === 'delete'}
                handleClose={this.handleClose}
              />
      
              <CancelEvent
                id={id}
                name={name}
                isVisible={visibleModal === 'cancel'}
                handleClose={this.handleClose}
              />
            </React.Fragment>
          )
        }
      </Container>
    )

  }
}

export default withNavigation(EventCard);