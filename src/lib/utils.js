import memoize from 'memoize-one';

export default sortBoards = memoize((data) => {
  const sorted = data.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
});

export const sortEvents = memoize((data) => {
  const sorted = data.sort((a, b) => {
    return Date.parse(a.startAt) - Date.parse(b.startAt);
  });
  return sorted;
});