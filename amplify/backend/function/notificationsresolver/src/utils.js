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

module.exports = {
  uniqueGroup,
  uniqueFlat,
  transformFollowing
};