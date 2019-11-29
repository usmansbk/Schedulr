function uniqueGroup(items) {
  let set = {};
  for (let item of items) {
    let elem = set[item.id];
    if (elem) {
      set[item.id] = { items: [...elem.items, item] };
    } else {
      set[item.id] = { items: [item] };
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

module.exports = {
  uniqueGroup,
  uniqueFlat
};