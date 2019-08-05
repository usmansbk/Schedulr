import React from 'react';
import { Auth } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react';
import Login from './Login';

class Container extends React.Component {
  state = { loading: false };

  componentDidMount = async () => {
    const { stores } = this.props;
    const colors = stores.themeStore.colors;
    try {
      await changeNavigationBarColor(colors.primary_light, false);
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.LONG);
    }
  }

  _signInAsync = async (provider) => {
    try {
      this.setState({ loading: true })
      await Auth.federatedSignIn({ provider });
      this.setState({ loading: false });
      // SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
    } catch (error) {
      SimpleToast.show('Login failed: ' + error.message, SimpleToast.SHORT);
    }
  };

  render() {
    return <Login
      handleLogin={this._signInAsync}
      loading={this.state.loading}
    />;
  }
}

const withStores = inject('stores')(observer(Container));
export default withStores;

// export default graphql(gql(LoginUser), {
//   alias: 'withLoginScreen',
//   props: ({ mutate, ownProps }) => ({
//     onSubmit: (input) => mutate({
//       variables: {
//         input
//       }
//     }),
//     ...ownProps
//   })
// })(withStores);
