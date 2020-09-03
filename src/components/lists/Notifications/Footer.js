import React from 'react';
import {View} from 'react-native';
import {Caption} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

export default inject('stores')(
  observer(({visible, stores}) =>
    visible ? (
      <View style={stores.styles.notifications.footer}>
        <Caption style={stores.styles.notifications.footerText}>
          {I18n.get('NOTIFICATIONS_allCaughtUp')}
        </Caption>
      </View>
    ) : null,
  ),
);
