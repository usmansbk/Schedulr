import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import 'twix';
import {ActivityIndicator, Caption} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';

class Header extends React.Component {
  render() {
    const {onPress, loading, stores, hide, beforeDate} = this.props;
    if (hide) return null;

    return (
      <TouchableOpacity
        disabled={!beforeDate || loading}
        onPress={onPress}
        style={stores.styles.eventsList.header}>
        <View>
          {loading ? (
            <ActivityIndicator
              size={20}
              animating
              color={stores.theme.colors.primary}
              style={{
                margin: 4,
              }}
            />
          ) : beforeDate ? (
            <Icon name="up" size={20} color={stores.theme.colors.tint} />
          ) : (
            <Caption style={stores.styles.eventsList.footerText}>
              {I18n.get(`EVENTS_SECTIONLIST_noPrevEvents`)}
            </Caption>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Header));
