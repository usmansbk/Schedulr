import React from 'react';
import moment from 'moment';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import Item from './Item';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  HEADER_HEIGHT,
} from './styles';
import dummy from './dummy';

class List extends React.Component {
  state = { update: null };
  _loadPrevious = () => console.log('Load previous events');
  _keyExtractor = (item, index) => item.cursor;
  _renderHeader = () => <Header onPress={this._loadPrevious} visible={defaultProps.hasPreviousEvents} />;
  _renderFooter = () => <Footer visible={defaultProps.sections.length}/>;
  _renderEmptyList = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({section}) => <SectionHeader section={section} />;
  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', { id });
  _onPressCommentItem = (id) => this.props.navigation.navigate('Comments', { id });
  _renderItem = ({ item:{ node: {
    id,
    title,
    description,
    location,
    type,
    isCancelled,
    commentsCount,
    starsCount,
    starred,
    start,
    end,
    repeat,
    group,
    allDay,
  }}}) => <Item
    id={id}
    title={title}
    description={description}
    location={location}
    type={type}
    isCancelled={isCancelled}
    commentsCount={commentsCount}
    starsCount={starsCount}
    starred={starred}
    start={start}
    end={end}
    groupName={group.name}
    repeat={repeat}
    allDay={allDay}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
  />;
  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
  });
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  componentDidMount = () => {
    this.updateList = setInterval(
      () => this.setState({ update: moment().format('mm') }),
    60000);
  }

  componentWillUnmount = () => clearInterval(this.updateList);

  render() {
    const {
      loading,
      sections,
      onRefresh,
    } = defaultProps;
    return (
      <SectionList
        initialNumToRender={0}
        style={styles.list}
        stickySectionHeadersEnabled
        getItemLayout={this._getItemLayout}
        sections={sections}
        extraData={this.props.isFocused && this.state.update}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}
const defaultProps = {
  loading: false,
  onRefresh: () => console.log('Refreshing'),
  hasPreviousEvents: true,
  sections: dummy,
};

export default withNavigationFocus(List);