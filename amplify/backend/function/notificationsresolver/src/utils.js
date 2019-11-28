function unique(items) {
  let set = {};
  for (let item of items) {
    set[item.id] = { items: [item] };
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