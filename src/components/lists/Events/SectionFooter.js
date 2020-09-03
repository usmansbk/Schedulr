import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

export default inject('stores')(
  observer(({section, stores}) => {
    if (section.data.length) return null;
    return (
      <View style={stores.styles.eventsList.sectionFooter}>
        <Text style={stores.styles.eventsList.footerText}>
          {I18n.get('EVENTS_SECTION_FOOTER')}
        </Text>
      </View>
    );
  }),
);
