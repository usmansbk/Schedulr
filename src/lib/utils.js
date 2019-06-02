import differenceWith from 'lodash.differencewith';
import memoize from 'lodash.memoize';

export const sectionListGetItemLayout = ({
	getItemHeight = () => 0,
	getSeparatorHeight = () => 0,
	getSectionHeaderHeight = () => 0,
	getSectionFooterHeight = () => 0,
	listHeaderHeight = 0,
	listFooterHeight = 0,
}) => (sections, index) => {
	let length = 0, offset = 0, currentIndex = 0;

	while (currentIndex < index) {
		offset += length;
		length = currentIndex > 0 ? listFooterHeight : listHeaderHeight;
		currentIndex++;
		const sectionsLength = sections.length;
		for (let sectionIndex = 0; ((sectionIndex < sectionsLength) && (currentIndex < index)); sectionIndex++) {
			offset += length;
			length = getSectionHeaderHeight(sectionIndex);
			
			currentIndex++;
			const sectionData = sections[sectionIndex].data;
			const dataLength = sectionData.length;
			for (let dataIndex = 0; ((dataIndex < dataLength) && (currentIndex < index)); dataIndex++) {
				offset +=length;
				const separator_height = dataIndex < dataLength - 1 ? getSeparatorHeight(sectionIndex, dataIndex) : 0;
				length = getItemHeight(sectionData[dataIndex], sectionIndex, dataIndex) + separator_height;
				currentIndex++;
			}
			if (!dataLength && (currentIndex < index)) {
				offset +=length;
				length = getSectionFooterHeight(sectionIndex);
				currentIndex++;
			}
		}
	}

	return {
		index,
		length,
		offset
	};
}


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

export function eventsDiff(prev, next) {
  return differenceWith(prev, next, (prevVal, nextVal) => {
    const prevCancelledDates = prevVal.cancelledDates || [];
    const nextCancelledDates = nextVal.cancelledDates || [];
    return (prevVal.title === nextVal.title) &&
      (prevVal.startAt === nextVal.startAt) &&
      (prevVal.endAt === nextVal.endAt) &&
      (prevVal.eventType === nextVal.eventType) &&
      (prevVal.repeat === nextVal.repeat) &&
      (prevVal.until === nextVal.until) &&
      (prevVal.isCancelled === nextVal.isCancelled) &&
      (prevCancelledDates.length === nextCancelledDates.length) &&
      (prevVal.isStarred === nextVal.isStarred) &&
      (prevVal.id === nextVal.id);
  });
}