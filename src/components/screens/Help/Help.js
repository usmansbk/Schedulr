import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar, List, Divider} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import env from 'config/env';

export default inject('stores')(
  observer((props) => (
    <>
      <Appbar.Header style={props.stores.styles.styles.header} collapsable>
        <Appbar.Action
          onPress={props.goBack}
          size={24}
          color={props.stores.theme.colors.primary}
          icon={({size, color}) => (
            <Icon name="arrow-left" color={color} size={size} />
          )}
        />
        <Appbar.Content
          title={I18n.get('HELP_title')}
          titleStyle={props.stores.styles.styles.headerColor}
        />
      </Appbar.Header>
      <ScrollView style={props.stores.styles.styles.bg}>
        <List.Item
          title={I18n.get('HELP_contactUs')}
          description={I18n.get('HELP_contactUsSubtitle')}
          onPress={() => props.onPressItem('contact')}
        />
        <Divider />
        <List.Item
          title={I18n.get('HELP_privacy')}
          onPress={() => props.onPressItem('privacy')}
        />
        <Divider />
        <List.Item
          title={I18n.get('HELP_terms')}
          onPress={() => props.onPressItem('terms')}
        />
        <Divider />
        <List.Item title={I18n.get('HELP_build')} description={env.BUILD} />
      </ScrollView>
    </>
  )),
);
