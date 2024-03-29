import React from 'react';
import {Dimensions} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {inject, observer} from 'mobx-react';
import Following from './Following';
import Created from './Created';

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created,
  },
  {
    initialLayout: {height: 0, width: Dimensions.get('window').width},
    tabBarComponent: (props) => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
      labelStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: ({navigation}) => ({
      header: () => (
        <HeaderComponent
          title={navigation.getParam('name')}
          goBack={() => navigation.goBack()}
        />
      ),
    }),
  },
);

export const HeaderComponent = inject('stores')(
  observer(({stores, title, goBack}) => (
    <Appbar.Header style={stores.styles.appStyles.header}>
      <Appbar.Action
        animated={false}
        onPress={goBack}
        icon={() => (
          <Icon
            name="arrow-left"
            color={stores.theme.colors.primary}
            size={24}
          />
        )}
      />
      <Appbar.Content
        title={title}
        titleStyle={stores.styles.appStyles.headerColor}
      />
    </Appbar.Header>
  )),
);

const TabBarComponent = inject('stores')(
  observer((props) => (
    <MaterialTopTabBar
      activeTintColor={props.stores.theme.colors.primary}
      inactiveTintColor={props.stores.theme.colors.tint}
      indicatorStyle={props.stores.styles.userSchedulesTab.indicatorStyle}
      style={props.stores.styles.userSchedulesTab.barStyle}
      {...props}
    />
  )),
);

export default Tabs;
