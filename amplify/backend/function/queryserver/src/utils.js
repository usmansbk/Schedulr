exports.filterCreatedSchedules = (connection) => {
  if (connection && connection.items) {
    return Object.assign({}, connection, {
      items: connection.items.filter(item => {
        return (item.isPublic || item.isOwner || item.isFollowing);
      })
    })
  }
  return connection;
};

exports.filterFollowingSchedules = (connection) => {
  if (connection && connection.items) {
    return Object.assign({}, connection, {
      items: connection.items.filter(item => {
        const { schedule } = item;
        if (!schedule) return true;
        return (schedule.isPublic || schedule.isOwner || schedule.isFollowing);
      })
    })
  }
  return connection;
};