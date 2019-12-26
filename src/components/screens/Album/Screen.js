import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import Album from './Album';

class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  render() {
    const { stores } = this.props;
    const appStyles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const id = this.props.navigation.getParam('id');
    return (
      <>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.Action
            onPress={this._goBack}
            color={colors.primary}
            size={24}
            icon={({ size, color }) => <Icon
              name="arrow-left"
              size={size}
              color={color}
            />}
          />
          <Appbar.Content
            titleStyle={appStyles.headerColor}
            title={I18n.get('TEXT_album')}
          />
        </Appbar.Header>
        <Album id={id} /> 
      </>
    )
  }
}

export default inject("stores")(observer(Screen));