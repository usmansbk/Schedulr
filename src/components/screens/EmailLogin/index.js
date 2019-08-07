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
      placeholder: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      placeholder: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      placeholder: '8 characters long',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    }
  ]
};

const usernameAttributes = 'Email';

export default withAuthenticator(Loading, { signUpConfig, usernameAttributes }, null, null, theme);