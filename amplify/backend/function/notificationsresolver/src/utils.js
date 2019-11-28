function unique(items) {
  let set = {};
  for (let item of items) {
    const elem = set[item.id];
    if (!elem) {
      set[item.id] = { items: [item] };
    } else {
      elem.items = unique(elem.items.concat([item]));
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
  unique,
  uniqueFlat
};