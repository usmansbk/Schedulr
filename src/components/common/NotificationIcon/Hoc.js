import { graphql, compose } from 'react-apollo';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import { eventsDiff } from 'lib/utils';
import { listAllEvents, listAllBoards } from 'mygraphql/queries';
import { listAllEventsDelta, listAllBoardsDelta } from 'mygraphql/deltasync';
import { filterEvents } from 'mygraphql/filter';
import Button from './Icon';

const EventsBaseQuery = gql(listAllEvents);
const EventsDeltaQuery = gql(listAllEventsDelta);
const BoardsBaseQuery = gql(listAllBoards);
const BoardsDeltaQuery = gql(listAllBoardsDelta);

export default inject("stores")(observer(
  compose(

  )(Button)
))