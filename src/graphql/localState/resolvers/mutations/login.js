import LOGIN_STATUS from '../../query/LoginStatus';

export default {
  updateLoginAgent: (_obj, { agent }, { cache }) => {
    const previous = cache.readQuery({ query: LOGIN_STATUS });
    const data = {
      loginStatus: Object.assign({}, previous.loginStatus, {
        agent,
      })
    };
    cache.writeData({ data });
    return null;
  },
  updateLoginStatus: (_obj, { isLoggedIn }, { cache }) => {
    const previous = cache.readQuery({ query: LOGIN_STATUS });
    const data = {
      loginStatus: Object.assign({}, previous.loginStatus, {
        isLoggedIn,
      })
    };
    cache.writeData({ data });
    return null;
  }
}