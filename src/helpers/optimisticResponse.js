import { Cache } from 'aws-amplify';
import moment from 'moment';
import { getValue } from '../lib/formValidator';
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
})

export const cancelEventResponse = async (input) => {

}

export const closeBoardResponse = async (input) => {

}

export const openBoardResponse = async (input) => {

}