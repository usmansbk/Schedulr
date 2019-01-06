import { Cache } from 'aws-amplify';
import moment from 'moment';
import client from '../config/client';
import { getUser, getBoard } from '../graphql/queries';

const __typename = 'Mutation';

export const createEventResponse = async (input) => {

}

export const createBoardResponse = async (input) => {

}

export const updateEventResponse = (input) => ({
  __typename,
  updateEvent: Object.assign({}, input, {
    __typename: 'Event',
    updatedAt: moment().toISOString(),
    location: Boolean(input.location.address) ? {
      __typename: 'Location',
      ...input.location
    } : null
  })
});

export const updateBoardResponse = async (input) => {

}

export const cancelEventResponse = async (input) => {

}

export const closeBoardResponse = async (input) => {

}

export const openBoardResponse = async (input) => {

}