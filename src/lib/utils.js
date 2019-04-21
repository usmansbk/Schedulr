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

export const sortEvents = memoize((events) => {
  const sorted = events.sort((a, b) => {
    return Date.parse(a.startAt) - Date.parse(b.startAt);
  });
  return sorted;
});

export const sortStarredEvents = memoize((events) => {
  const sorted = events.sort((a, b) => {
    const now = Date.now();

    const startAtA = Date.parse(a.startAt);
    const startAtB = Date.parse(b.startAt);

    const endAtA = Date.parse(a.endAt);
    const endAtB = Date.parse(b.endAt);

    if (now > endAtA) return now - endAtA;
    if (now > endAtB) return endAtB - now;
    return startAtA - startAtB;
  });
  return sorted;
});