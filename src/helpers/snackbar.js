import Snackbar from 'react-native-snackbar';
import colors from 'config/colors';

export default (message, error) => {
  if (message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: error ? colors.error : colors.primary
    });
  }
}