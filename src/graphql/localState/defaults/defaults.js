export default {
  community: null,
  loginStatus: {
    __typename: 'LoginStatus',
    isLoggedIn: false,
    agent: null,
  },
  groups: {
    __typename: 'GroupConnection',
    edges: [],
  },
  events: {
    __typename: 'EventConnection',
    edges: [],
  },
}