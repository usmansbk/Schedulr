import { observable, action, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import gql from 'graphql-tag';
import client from 'config/client';
import { LoginUser } from 'mygraphql/mutations';
import SimpleToast from 'react-native-simple-toast';

export default class UserProfile {
  @persist @observable id;
  @persist @observable __typename = "User";
  @persist @observable name = "Mobx";
  @persist @observable email = "hello@help.com";
  @persist @observable pictureUrl = null;

  asJs() {
    return ({
      __typename: this.__typename,
      id: this.id,
      name: this.name,
      email: this.email,
      pictureUrl: this.pictureUrl,
    })
  }

  @action reset() {
    this.id = null;
    this.__typename = 'User';
    this.name = 'Mobx';
    this.email = "hello@help.com";
    this.pictureUrl = null;
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
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
  }
}