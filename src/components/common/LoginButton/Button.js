import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  Button
} from 'native-base';
import i18n from '../../../config/i18n';

class LoginButton extends PureComponent {

  handlePress = () => {
    const { community, navigation } = this.props;
    navigation.navigate(Boolean(community) ? 'Login' : 'Auth');
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Button
        bordered
        rounded
        onPress={this.handlePress}
      >
        <Text uppercase={false}>
          {
            isLoggedIn ? i18n.t('auth.sign_out') : i18n.t('auth.sign_in')
          }
        </Text>
      </Button>
    )
  }
}

export default withNavigation(LoginButton);