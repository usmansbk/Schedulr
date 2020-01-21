import Snackbar from 'react-native-snackbar';
import { observable, action } from 'mobx';
import colors from 'config/colors';

export default class SnackbarStore {
  @observable message = '';
  @observable visible = false;

  @action show(message, error) {
    if (message) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: error ? colors.error : colors.primary
      });
    }
  }
}