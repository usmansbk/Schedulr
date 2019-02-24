import { observable, action, runInAction } from 'mobx';
import gql from 'graphql-tag';
import client from '../config/client';
import { LoginUser } from '../graphql/mutations';
import SimpleToast from 'react-native-simple-toast';

export default class UserProfile {
  id = '0';
  __typename = "User";
  @observable name = "Mobx";
  @observable email = "hello@help.com";
  @observable pictureUrl = null;

  asJs() {
    return ({
      __typename: this.__typename,
      id: this.id,
      name: this.name,
      email: this.email,
      pictureUrl: this.pictureUrl,
    })
  }

  @action
  async login(input) {
    try {
      const response = await client.mutate({
        mutation: gql(LoginUser),
        variables: {
          input
        }
      });
      const me = response.data.loginUser;
      runInAction(() => {
        this.id = me.id;
        this.name = me.name;
        this.email = me.email;
        this.pictureUrl = me.pictureUrl;
      });
    } catch (e) {
      SimpleToast.show(e.message, SimpleToast.SHORT);
    }
  }
}