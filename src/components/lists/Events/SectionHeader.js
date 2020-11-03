import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption, Headline} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {getSectionHeaderData} from 'lib/time';
import {date, castDateTime, format} from 'lib/date';
import {BULLET} from 'lib/constants';

class SectionHeader extends React.Component {
  _onPress = () => {
    const source = date();
    const target = date(this.props.section.title);
    const targetDate = format(castDateTime(source, target));
    this.props.onPress(targetDate);
  };

  render() {
    const {
      section: {title, data},
      stores,
    } = this.props;

    const {heading, subheading, timeAgo} = getSectionHeaderData(title);
    let count = data.length;
    let itemsCount = '';
    let time = '';
    if (count) {
      time = timeAgo;
    }
    if (count > 1) {
      itemsCount = `${I18n.get('EVENTS_SECTION_ITEM_COUNT')(count)} ${
        time ? BULLET : ''
      } `;
    }

    const styles = stores.styles.eventsList;

    return (
      <TouchableOpacity style={styles.sectionHeader} onPress={this._onPress}>
        <View>
          <Headline
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.sectionHeading}>
            {heading}
          </Headline>
          <View style={styles.sectionSubheadingContent}>
            <Text
              style={styles.sectionSubheading}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {subheading}
            </Text>
            <Caption>
              {itemsCount}
              {time}
            </Caption>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(SectionHeader));
