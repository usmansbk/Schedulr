import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'twix';
import {
  ActivityIndicator,
  Caption
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class Header extends React.Component {
  render() {
    const { onPress, loading, stores, hide, beforeDate } = this.props;
    if (hide) return null;

    let prevDate;
    if (beforeDate) {
      const prevMoment = beforeDate ? moment(beforeDate) : moment();
      prevDate = prevMoment.twix(prevMoment, { allDay: true }).format();
    }

    return (
      <TouchableOpacity
        disabled={!prevDate || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.header}
      >
        <View>
          {
            loading ? (
              <ActivityIndicator
                size={20}
                animating
                color={stores.themeStore.colors.primary}
                style={{
                  margin: 4
                }}
              />
            ) : (
              <Caption style={stores.appStyles.eventsList.footerText}>
                {
                  I18n.get(`EVENTS_SECTIONLIST_${prevDate ? 'before' : 'noPrevEvents'}`)(prevDate)
                }
              </Caption>
            )
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Header));
