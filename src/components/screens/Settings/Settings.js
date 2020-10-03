import React from 'react';
import {SectionList} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Item from './Item';
import Suspense from 'components/common/Suspense';
import items from './items';
import snackbar from 'helpers/snackbar';

class Settings extends React.Component {
  state = {
    display: false,
  };

  static defaultProps = {
    stores: {},
  };

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  handleValueChange = (value) => {
    switch (value) {
      case 'disablePush':
      case 'disableComments':
        this.props.stores.settings.togglePref(value);
        break;
      default:
        this.props.stores.settings.toggle(value);
        break;
    }
  };

  toggleTheme = () => {
    this.props.stores.settings.toggleTheme();
  };

  _handleRemindMeDialog = () => {
    const {openRemindMeDialog, stores} = this.props;
    if (stores.settings.disableReminders) {
      snackbar(I18n.get('TOAST_enableReminder'));
    } else {
      openRemindMeDialog();
    }
  };

  _handleThemeDialog = () => {
    this.props.openThemeDialog();
  };

  _keyExtractor = (item) => item.key;

  _renderItem = ({item}) => {
    let keys = this.props.stores.settings;
    switch (item.key) {
      case 'disablePush':
      case 'disableComments':
        keys = this.props.stores.settings.userPreference;
        break;
    }

    return (
      <Item
        item={item}
        value={keys[item.key]}
        handleValueChange={this.handleValueChange}
        handleRemindMeDialog={this._handleRemindMeDialog}
        handleThemeDialog={this._handleThemeDialog}
        color={this.props.stores.theme.colors.gray}
      />
    );
  };

  _renderSectionHeader = ({section: {title}}) => (
    <Text
      style={{
        paddingTop: 16,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        color: this.props.stores.theme.colors.gray,
      }}>
      {I18n.get(`SETTINGS_${title}SectionTitle`)}
    </Text>
  );

  render() {
    if (!this.state.display) return <Suspense />;

    const {goBack, stores} = this.props;
    const {appStyles: styles} = stores.styles;

    return (
      <>
        <Appbar style={styles.header} collapsable>
          <Appbar.Action
            animated={false}
            onPress={goBack}
            size={24}
            color={stores.theme.colors.primary}
            icon={({color, size}) => (
              <Icon name="arrow-left" size={size} color={color} />
            )}
          />
          <Appbar.Content
            title={I18n.get('SETTINGS_screenTitle')}
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <SectionList
          contentContainerStyle={[styles.bg, {flex: 1}]}
          sections={items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          extraData={stores.settings.extraData}
        />
      </>
    );
  }
}

export default inject('stores')(observer(Settings));
