import React, { Component } from 'react';
import { Text, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { SectionList, View, ToastAndroid } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import memoize from 'memoize-one';
import moment from 'moment';
import sectionizr from '../../lib/sectionizr';
import i18n from '../../config/i18n';
import schdlAll from '../../lib/remindr';
import { ONE_MINUTE } from '../../lib/time';
import { LOADING } from '../../lib/constants';
import EventItem from './EventItem';
import EmptyList from '../common/EmptyList';
import styles, { ITEM_HEIGHT, SEPERATOR_HEIGHT, SECTION_HEADER_HEIGHT } from './styles';

class List extends Component {
  state = {
    update: 0,
    sections: [],
    loading: true,
  }

  componentDidMount = () => {
    this.updateList = setInterval(
      () => this.setState({ update: moment().format('mm') }),
      ONE_MINUTE
    );
    this.loading = setTimeout(
      () => this.setState({
        sections: this._sections(this.props.edges),
        loading: false
      }),
      LOADING
    )
  }

  componentWillUnmount = () => {
    clearInterval(this.updateList);
    clearTimeout(this.loading);
  }

  shouldComponentUpdate = (_, nextState) => {
    return (this.state.loading !== nextState.loading) ||
      (this.state.update !== nextState.update) ||
      (this.state.sections !== nextState.sections);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.edges !== nextProps.edges) {
      this.setState({ sections: this._sections(nextProps.edges) });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.edges !== this.props.edges) {
      schdlAll(this.props.edges);
    }
  }

  _onPressItem = (id, name) => {
    this.props.navigation.navigate('EventCard', { id, name });
  }

  _onPressComment = (id, name) => {
    this.props.navigation.navigate('Comments', { id, name });
  }

  _onPressTodo = (id) => {
    this.props.navigation.navigate('Todos', { id });
  }

  _onRefresh = () => ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);

  _sections = memoize((events) => sectionizr(events));

  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      location,
      eventType,
      isCancelled,
      commentsCount,
      likesCount,
      isMember,
      isStarred,
      start,
      end,
      repeat
    } = item;

    return (
      <EventItem
        id={id}
        name={name}
        update={this.state.update}
        description={description}
        location={location}
        eventType={eventType}
        start={start}
        end={end}
        repeat={repeat}
        commentsCount={commentsCount}
        likesCount={likesCount}
        isMember={isMember}
        isStarred={isStarred}
        isCancelled={isCancelled}
        onPressItem={this._onPressItem}
        onPressComment={this._onPressComment}
        onPressTodo={this._onPressTodo}
      />
    )
  }

  _renderSectionHeader = ({section}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.headerTitle}>{section.title.title}</Text>
      <Text style={styles.headerSubtitle}>{section.title.subtitle}</Text>
    </View>
  );

  _keyExtractor = (item, index) => item.id;

  _renderHeader = () => {
    const { loading, hasPreviousPage } = this.state;
    if (!hasPreviousPage) return null;
    return (
      <Button
        transparent
        block
        disabled={loading}
        onPress={this._loadRecentEvents}
      >
        <Text uppercase={false} style={styles.footerText}>
        { loading ? 'Loading' : i18n.t("event_list.prev")}
        </Text>
      </Button>
    )
  }

  _renderEmptyList = () => (this.state.loading ? null :
    <EmptyList title={i18n.t("event_list.empty")} />
  );

  _renderSeparator = () => <View style={styles.seperator} />

  _renderFooter = () => Boolean(this.state.sections.length) ? (
    <View style={styles.listFooter}>
      <Text style={styles.footerText}>{i18n.t("event_list.footer")}</Text>
    </View>
  ) : null;

  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT
  });

  render() {
    return (
      <SectionList
        getItemLayout={this._getItemLayout}
        sections={this.state.sections}
        extraData={this.state.update}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={this.state.loading}
        onRefresh={this._onRefresh}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        stickySectionHeadersEnabled
      />
    )
  }
}

export default withNavigation(List);