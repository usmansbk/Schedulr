import { observable } from 'mobx';

export default class UserProfile {
  id;
  __typename = "User";
  @observable name = "Mobx";
  @observable email = "hello@help.com";
  @observable pictureUrl;
}