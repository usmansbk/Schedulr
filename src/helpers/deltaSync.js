import moment from 'moment';

export default function updateBaseCache({
  prev,
  fetchMoreResult,
  stores,
}) {
	console.log(fetchMoreResult);
	if (!fetchMoreResult) return prev;

	const lastSyncTimestamp = moment().unix() - 2;
	stores.appState.updateLastSyncTimestamp(lastSyncTimestamp);
	if (!fetchMoreResult) return prev;
	return prev;
}

