import { observable, action } from 'mobx';

export default class Snackbar {
  @observable visible = false;
  @observable message = '';

  @action dismiss = () => {
    this.visible = false;
  }

  @action handleOpen = (message) => {
    this.visible = true;
    this.message = message;
  }

}