const DELETE = 'DELETE';
const CREATE = 'CREATE';

function processUpdates(updates) { //eslint-disable-line
  let Items = [];
  for (let update of updates) {
    const { items } = update;
    const count = items.length;
    if (count) {
      const latest = items[count - 1];
      const { newImage, oldImage, aws_ds } = latest;
      let image = newImage;
      if (aws_ds === DELETE) {
        image = oldImage;
      }
      const item = Object.assign({}, image, { aws_ds });
      Items.push(item);
    }
  }
  return Items;
}

function uniqItems(items) {
  let latestUpdates = {};
  for (let item of items) {
    latestUpdates[item.id] = { items: [item] };
  }
  return Object.values(latestUpdates);
}

function processEvents(updates) {
  let Items = [];
  for (let schedule of updates) {
    const { items } = schedule;
    const events = uniqItems(items);
    Items = [...Items, ...events];
  }
  return processUpdates(Items);
}

module.exports.processUpdates = processUpdates;
module.exports.processEvents = processEvents;