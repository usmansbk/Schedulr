import { DELETE, EVENT_TYPE } from 'lib/constants';

export default function updateBaseCache({
  prev,
  fetchMoreResult,
  stores,
}) {
	stores.appState.updateLastSyncTimestamp();

	if (!fetchMoreResult) return prev;
	const { getUserData } = prev;

	const updatedUserData = deltaRecordsProcessor({
		baseResult: getUserData,
		deltaRecords: fetchMoreResult.deltaSync
	});

	return Object.assign({}, prev, {
		getUserData: updatedUserData
	});
}

const deltaRecordsProcessor = ({
	deltaRecords,
	baseResult
}) => {
	if (!deltaRecords.length) return baseResult;

	const updateBaseResult = Object.assign({}, baseResult);

	deltaRecords.forEach(deltaRecord => (
		updateBaseWithDelta({
			data: deltaRecord,
			typename: deltaRecord.__typename,
			action: deltaRecord.aws_ds,
			baseData: updateBaseResult
		})
	));
	return updateBaseResult;
};

const updateBaseWithDelta = ({
	data,
	typename,
	action,
	baseData
}) => {
	if (typename === EVENT_TYPE) {
		updateBaseEvents({
			data,
			action,
			baseData
		});
	} else {
		updateBaseSchedules({
			data,
			action,
			baseData
		});
	}
};

const updateBaseSchedules = ({ data, action, baseData }) => {
	const removeDuplicate = baseData.following.items.filter(({ schedule }) => (schedule && (schedule.id !== data.id)));
	let updatedItems = baseData.following.items;
	if (action === DELETE) {
		updatedItems = removeDuplicate;
	} else {
		const follow = baseData.following.items.find(({ schedule }) => (schedule && (schedule.id === data.id)));
		if (follow) {
			const updatedFollow = Object.assign({}, follow, {
				schedule: Object.assign({}, follow.schedule, data)
			});
			updatedItems = [...removeDuplicate, updatedFollow];
		}
	}
	baseData.following = Object.assign({}, baseData.following, {
		items: updatedItems
	});
};

const updateBaseEvents = ({ data, action, baseData }) => {
	const { isBookmarked, schedule: { id } } = data;
	const { bookmarks, following } = baseData;

	const follow = following.items.find(({ schedule }) => schedule && (schedule.id === id));

	let removeScheduleEventsDuplicate;
	let removeBookmarkDuplicate;

	let bookmarkItems;
	let scheduleEvents;

	if (follow) removeScheduleEventsDuplicate = follow.schedule.events.items.filter(item => item.id !== data.id);
	if (isBookmarked) removeBookmarkDuplicate = bookmarks.items.filter(({ event }) => event && (event.id !== data.id));

	if (action === DELETE) {
		if (removeBookmarkDuplicate) bookmarkItems = removeBookmarkDuplicate;
		if (removeScheduleEventsDuplicate) scheduleEvents = removeScheduleEventsDuplicate;
	} else {
		const event = Object.assign({}, data);
		if (removeScheduleEventsDuplicate) scheduleEvents = [...removeScheduleEventsDuplicate, event];
		if (removeBookmarkDuplicate) {
			const bookmark = bookmarks.items.find(({ event }) => event && event.id === data.id);
			if (bookmark) {
				const updatedBookmark = Object.assign({}, bookmark, { event });
				bookmarkItems = [...removeBookmarkDuplicate, updatedBookmark];		
			}
		}
	}

	if (bookmarkItems) {
		baseData.bookmarks = Object.assign({}, baseData.bookmarks, {
			items: bookmarkItems
		});
	}
	if (scheduleEvents) {
		const removeFollowDuplicate =  following.items.filter(item => item.id !== follow.id);

		const updatedFollow = Object.assign({}, follow, {
			schedule: Object.assign({}, follow.schedule, {
				events: Object.assign({}, follow.schedule.events, {
					items: scheduleEvents
				})
			})
		});
		baseData.following = Object.assign({}, baseData.following, {
			items: [...removeFollowDuplicate, updatedFollow]
		});
	}
};