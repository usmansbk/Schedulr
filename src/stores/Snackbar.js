import SimpleToast from 'react-native-simple-toast';
import { observable, action } from 'mobx';

export default class SnackbarStore {
  @observable message = '';
  @observable visible = false;

  @action show(message) {
    if (message) {
      SimpleToast.show(message, SimpleToast.SHORT);
    }
  }
}