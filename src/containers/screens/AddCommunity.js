import React, { PureComponent } from 'react';
import { ToastAndroid } from 'react-native';
import { Mutation } from 'react-apollo';
import AddCommunity from '../../components/screens/AddCommunity';
import COMMUNITY from '../../graphql/mutation/AddCommunity';
import { setCommunity } from '../../lib/cache';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages'

export default class AddCommunityContainer extends PureComponent {

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _onCompleted = async (result) => {
    const { addCommunity } = result;
    if (!addCommunity) {
      ToastAndroid.show('Not found', ToastAndroid.SHORT);
      return;
    }
    const { community } = addCommunity;
    setCommunity(community);
    this.props.navigation.navigate('Login', { community })
  }

  _onError = (err) => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)

  render() {
    return (
      <Mutation
        mutation={COMMUNITY}
        onCompleted={this._onCompleted}
        onError={this._onError}
      >
        {(addComunity, { loading }) => {
          return (
            <AddCommunity
              addCommunity={addComunity}
              navigation={this.props.navigation}
              loading={loading}
            />
          )
        }}
      </Mutation>
    )
  }
}