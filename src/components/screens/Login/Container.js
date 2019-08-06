import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react';
import Login from './Login';

class Container extends React.Component {
  state = { loading: false };

  componentDidMount = async () => {
    const { stores } = this.props;
    const colors = stores.themeStore.colors;
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch(event) {
        case "signIn":
          const user = await Auth.currentAuthenticatedUser();
          const { signInUserSession: { idToken: { payload } } } = user;
          // SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
          // alert(`${payload.email} - ${user.username}`);
          alert(JSON.stringify(user));
          break;
      }
    });
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

export default inject('stores')(observer(Container));

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
