import moment from 'moment';

export default function updateBaseCache({
  prev,
  fetchMoreResult,
  stores,
}) {
	console.log(fetchMoreResult);
	const lastSyncTimestamp = moment().unix();
	stores.appState.updateLastSyncTimestamp(lastSyncTimestamp);
	if (!fetchMoreResult) return prev;
	// return mergeChanges(prev, fetchMoreResult, stores);
	return prev;
}

function mergeChanges(prevData, newData, stores) {
 	const { getUserDelta } = newData;
 	const { getUserData } = prevData;

	if (!(getUserDelta && getUserData)) return prevData;
	
	const { notifications } = getUserDelta;

	return Object.assign({}, prevData, {
		getUserData: Object.assign({}, getUserData, {
			following: updatedFollowing,
			bookmarks: updatedBookmarks
		})
	});
}
