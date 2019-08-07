import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import Screen from './Screen';
import colors from 'config/colors';

const theme ={
  ...AmplifyTheme,
  button:{
    ...AmplifyTheme.button,
    backgroundColor: colors.primary
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary_light
  }
};

export default withAuthenticator(Screen, null, null, null, theme);