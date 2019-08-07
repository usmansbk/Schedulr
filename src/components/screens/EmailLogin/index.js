import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import colors from 'config/colors';
import Loading from 'components/common/Loading';

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

export default withAuthenticator(Loading, null, null, null, theme);