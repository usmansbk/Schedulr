const DELETE = 'DELETE';
const CREATE = 'CREATE';

module.exports.processUpdates = function (updates) { //eslint-disable-line
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