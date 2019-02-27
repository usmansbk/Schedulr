import { observable, action, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import gql from 'graphql-tag';
import client from '../config/client';
import { LoginUser } from '../graphql/mutations';
import SimpleToast from 'react-native-simple-toast';

export default class UserProfile {
  @persist @observable id = '0';
  @persist @observable __typename = "User";
  @persist @observable name = "Mobx";
  @persist @observable email = "hello@help.com";
  @persist @observable pictureUrl = null;
  @persist @observable createdCount = 0;
  @persist @observable followingCount = 0;

  asJs() {
    return ({
      __typename: this.__typename,
      id: this.id,
      name: this.name,
      email: this.email,
      pictureUrl: this.pictureUrl,
      createdCount: this.createdCount,
      followingCount: this.followingCount
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