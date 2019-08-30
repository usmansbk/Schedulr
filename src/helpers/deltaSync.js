import moment from 'moment';
const BUFFER_MILLISECONDS = 2000;

export default function updateBaseCache({
  prev,
  fetchMoreResult,
  stores,
}) {
	console.log(fetchMoreResult);
	const lastSyncTimestamp = moment.now() - BUFFER_MILLISECONDS;
	stores.appState.updateLastSyncTimestamp(lastSyncTimestamp);
	if (!fetchMoreResult) return prev;
	handleNotifications(fetchMoreResult, stores);
	return mergeChanges(prev, fetchMoreResult);
}

function handleNotifications({ getUserDelta }, stores) {
	if (!getUserDelta) return;
	const { notifications } = getUserDelta;
	if (notifications.length) stores.appState.setNotificationsIndicator(true);
}

function mergeChanges(prevData, newData) {
 	const { getUserDelta } = newData;
 	const { getUserData } = prevData;

	if (!(getUserDelta && getUserData)) return prevData;
	
	const { following, bookmarks } = getUserDelta;
 	const updatedFollowing = updateFollowing(getUserData.following, following);
	const updatedBookmarks = updateBookmarks(getUserData.bookmarks, bookmarks);

	return Object.assign({}, prevData, {
		getUserData: Object.assign({}, getUserData, {
			following: updatedFollowing,
			bookmarks: updatedBookmarks
		})
	});
}

function updateBookmarks(prev, bookmarks) {
	const { items } = bookmarks;
	const newItems = [...prev.items];
	items.forEach(bookmark => {
		const { event } = bookmark;
		if (!event || event.isOwner) return bookmark;
		const index = newItems.findIndex(prevBookmark => prevBookmark.id === bookmark.id);
		if (index === -1) {
			newItems.push(bookmark);
		} else {
			newItems[index] = bookmark;
		}
	});
	return Object.assign({}, bookmarks, {
		items: newItems
	});
}

function updateFollowing(prev, following) {
	const { items } = following;
	return Object.assign({}, following, {
		items: items.map(follow => {
			const { schedule } = follow;
			if (!schedule) return follow;
			const { events } = schedule;

			const prevFollow = prev.items.find(prevFollow => prevFollow.id === follow.id);
			const { schedule: prevSchedule } = prevFollow;
			const { events: prevEvents } = prevSchedule;

			const newItems = [...prevEvents.items];
			events.items.forEach((item) => {
				const index = newItems.findIndex(prevItem => prevItem.id === item.id);
				if (index === -1) {
					newItems.push(item);
				} else {
					newItems[index] = item;
				}
			});

			return Object.assign({}, follow, {
				schedule: Object.assign({}, schedule, {
					events: Object.assign({}, events, {
						items: newItems
					})
				})
			});
		})
	});
}