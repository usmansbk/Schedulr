import React, {Component} from 'react';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from '../../lists/Boards';
import { createdBoards as createdBoardsQuery } from '../../../graphql/queries';

class Boards extends Component{

  render(){

    return (
      <List 
        board={data}
        loading={false}
        onRefresh={this._onRefresh}
      />
    )
  }
}

const data = [
  {
    id: 1,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 2,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 3,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 4,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 5,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 6,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 7,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 8,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 11,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 12,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 13,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 14,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 15,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
]

export default (Boards);