import React, {Component} from 'react';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from '../../lists/Boards';
import { createdBoards as createdBoardsQuery } from '../../../graphql/queries';

class Boards extends Component{

  render(){

    return (
      <List 
        board={[]}
        loading={false}
        onRefresh={this._onRefresh}
      />
    )
  }
}

export default (Boards);