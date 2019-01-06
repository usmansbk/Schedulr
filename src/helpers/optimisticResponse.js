import { Cache } from 'aws-amplify';
import gql from 'graphql-tag';
import moment from 'moment';
import { getValue } from '../lib/formValidator';
import client from '../config/client';
import { getUser, getBoard, getEvent } from '../graphql/queries';

const __typename = 'Mutation';

export const createEventResponse = async (input) => {

}

export const createBoardResponse = async (input) => {

}

export const updateEventResponse = (input) => ({
  __typename,
  updateEvent: Object.assign({}, input, {
    __typename: 'Event',
    title: getValue(input.title),
    description: getValue(input.description),
    updatedAt: moment().toISOString(),
    location: Boolean(input.location.address) ? {
      __typename: 'Location',
      ...input.location
    } : null
  })
});

export const updateBoardResponse = (input) => ({
  __typename,
  updateBoard: Object.assign({}, input, {
    __typename: 'Board',
    name: getValue(input.name),
    description: getValue(input.description),
    isPublic: Boolean(input.isPublic),
    updatedAt: moment().toISOString()
  })
});

export const cancelEventResponse = (input) => {
  try {
    const data = client.readQuery({
      query: gql(getEvent),
      variables: {
        id: input.id
      }
    });
    console.log(data);
    const { getEvent } = data;
    const isCancelled =  input.option === 'ALL' ? true : false;
    const cancelledDates = new Set(getEvent.cancelledDates || []);
    const updatedAt = isCancelled ? moment().toISOString() : null;
    if (!isCancelled) {
      cancelledDates.add(input.date);
    }
    return ({
      __typename,
      cancelEvent: {
        __typename: 'Event',
        id: input.id,
        isCancelled,
        cancelledDates,
        updatedAt
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const closeBoardResponse = (input) => ({
  __typename,
  closeBoard: Object.assign({}, input, {
    __typename: 'Board',
    status: 'CLOSED',
    updatedAt: moment().toISOString()
  })
});

export const openBoardResponse = (input) => ({
  __typename,
  openBoard: Object.assign({}, input, {
    __typename: 'Board',
    status: 'OPEN',
    updatedAt: moment().toISOString()
  })
});