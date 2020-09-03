import Snackbar from 'react-native-snackbar';
import colors from 'config/colors';

export default (message, isError) => {
  if (message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: isError ? colors.error : colors.primary,
    });
  }
};
