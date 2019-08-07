import React from 'react';
import { Auth } from 'aws-amplify';
import Loading from 'components/common/Loading';

export default class Screen extends React.Component {
  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
  }
  
  render() {
    return <Loading />;
  }
}