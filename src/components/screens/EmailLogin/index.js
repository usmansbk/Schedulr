import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import colors from 'config/colors';
import Loading from 'components/common/Loading';

const theme ={
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primary
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary_light
  },
  buttonDisabled: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primaryOpaque(0.6)
  }
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    }
  ]
};

export default withAuthenticator(Loading, { signUpConfig }, null, null, theme);