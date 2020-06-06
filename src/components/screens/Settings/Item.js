import React from 'react';
import {
  List,
} from 'react-native-paper';
import Switch from 'components/common/Switch';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class Item extends React.Component {
  _handleRemindMeDialog = () => this.props.handleRemindMeDialog();
  _handleThemeDialog = () => this.props.handleThemeDialog();
  _handleValueChange = () => this.props.handleValueChange(this.props.item.key);
  shouldComponentUpdate = nextProps => Boolean(nextProps.value !== this.props.value);

  render() {
    const { color, item, value } = this.props;
    
    if (item.key === 'remindMe') {
      return (
        <List.Item
          title={I18n.get("SETTINGS_remindMe")}
          right={() => <List.Icon
            icon={() => <Icon
              name="chevron-right"
              color={color}
              size={24}
            />}
          />}
          onPress={this._handleRemindMeDialog}
        />
      )
    }

    if (item.key === 'dark') {
      return (
        <List.Item
          title={I18n.get(`SETTINGS_${item.key}`)}
          right={() => <List.Icon
            icon={() => <Icon
              name="chevron-right"
              color={color}
              size={24}
            />}
          />}
          onPress={this._handleThemeDialog}
        />
      );
    }

    return (
      <List.Item
        title={I18n.get(`SETTINGS_${item.key}`)}
        right={() => (
          <Switch
            value={value}
            onValueChange={this._handleValueChange}
          />
        )}
      />
    );
  }
}

export default inject("stores")(observer(Item));