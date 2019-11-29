function uniqueGroup(items) {
  let set = {};
  for (let item of items) {
    let elem = set[item.id];
    if (elem) {
      elem.items = [...elem.items, item];
    } else {
      set[item.id] = { items: [item], id: item.id };
    }
  }
  return Object.values(set);
}

function uniqueFlat(items) {
  let set = {};
  for (let item of items) {
    set[item.id] = item;
  }
  return Object.values(set);
}

function transformFollowing(schedules) {
  let allItems = [];
  for (let schedule of schedules) {
    const { items } = schedule;
    const events = uniqueGroup(items);
    allItems = [...allItems, ...events];
  }
  return allItems;
}

function groupCommentsByEvent({ comments }) {
  let events = {};
  for (let comment of comments) {
    let elem = events[comment.commentEventId];
    if (elem) {
      elem.items = [...elem.items, comment];
    } else {
      events[comment.commentEventId] = {
        id: comment.commentEventId,
        items: [comment]
      };
    }
  }

  return Object.values(events);
}

module.exports = {
  uniqueGroup,
  uniqueFlat,
  transformFollowing,
  groupCommentsByEvent
};