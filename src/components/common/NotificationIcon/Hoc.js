import { graphql, compose } from 'react-apollo';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import { eventsChanged } from 'lib/utils';
import { listAllEvents, listAllSchedules } from 'mygraphql/queries';
import { listAllEventsDelta, listAllSchedulesDelta } from 'mygraphql/deltasync';
import { filterEvents } from 'mygraphql/filter';
import Button from './Icon';

const EventsBaseQuery = gql(listAllEvents);
const EventsDeltaQuery = gql(listAllEventsDelta);
const SchedulesBaseQuery = gql(listAllSchedules);
const SchedulesDeltaQuery = gql(listAllSchedulesDelta);

export default inject("stores")(observer(
  compose(

  )(Button)
))