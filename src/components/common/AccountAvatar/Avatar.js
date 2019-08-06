import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import UserAvatar from '../UserAvatar';
import styles from './styles';

class Avatar extends React.Component {
  state = {
    username: '',
    email: '',
    pictureUrl: null,
    loading: false
  };

  onPress = () => {
    this.props.onPress();
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { signInUserSession : { idToken: { payload } } }= user;
      let pictureUrl;
      const { picture, name, email } = payload;
      if (picture) {
        if (payload["cognito:username"].startsWith('Facebook')) {
          const json = JSON.parse(picture)
          pictureUrl = json.data.url;
        } else {
          pictureUrl = picture;
        }
      }
      this.setState({
        name,
        email,
        pictureUrl,
        loading: false
      });
    } catch(e) {
      console.log(e.message);
    }
  }

  render() {
    const {
      name,
      email,
      pictureUrl
    } = this.state;

    return (
      <TouchableRipple
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={styles.content}>
          <UserAvatar
            size={80}
            name={'hello'}
            style={styles.avatar}
            src={pictureUrl}
          />
          <View style={styles.text}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>
            <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Avatar));