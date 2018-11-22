import React from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import Item from './Item';
import {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT
} from './styles';

class List extends React.Component {
  state = { update: null };
  _loadPrevious = () => console.log('Load previous events');
  _getItemLayout = () => console.log('getItemLayout');
  _keyExtractor = (item, index) => item.id;
  _renderHeader = () => <Header onPress={this._loadPrevious} visible={true || defaultProps.hasPreviousEvents} />;
  _renderFooter = () => <Footer visible={true || defaultProps.sections.length}/>;
  _renderEmptyList = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({section}) => <SectionHeader section={section} />;
  _renderItem = () => <Item />;
  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT
  });

  render() {
    const {
      loading,
      sections,
      onRefresh,
    } = defaultProps;
    return (
      <SectionList
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
  sections: [],
  onRefresh: () => console.log('Refreshing'),
  hasPreviousEvents: false,
};

export default withNavigationFocus(List);