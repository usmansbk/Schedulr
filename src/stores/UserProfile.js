import { observable } from 'mobx';

export default class UserProfile {
  id;
  name = "Mobx";
  email = "hello@help.com";
  pictureUrl;
}