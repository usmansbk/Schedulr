

exports.handler = async function (event, context) { //eslint-disable-line
  const lastSync = event.arguments.lastSync;
  const userId = event.identity.claims.email;

  return {
    events: [],
    schedules: []
  };
};
