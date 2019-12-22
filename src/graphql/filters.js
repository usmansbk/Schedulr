import moment from 'moment';

export const pastEventsFilter = () => {
	const time = moment().toISOString();
	return {
		or: [
			{
				isCancelled: {
					eq: true
				}
			},
			{
				and: [
					{
						endAt: {
							lt: time
						}
					},
					{
						recurrence: {
							eq: 'NEVER'
						}
					}
				]
			},
			{
				and: [
					{
						recurrence: {
							ne: 'NEVER'
						}
					},
					{
						until: {
							lt: time
						}
					}
				]
			}
		]
	};
}

export const deltaEventsFilter = timestamp => {
	const time = timestamp ? moment(timestamp) : moment();
	const lastSync = time.toISOString();
	return {
		updatedAt: {
			gt: lastSync
		}
	}
};

export const baseEventsFilter = () => {
	const now = moment().toISOString();
	return {
		or: [
			{
				endAt: {
					ge: now
				}
			},
			{	
				and: [
					{
						isCancelled: {
							ne: true
						}
					},
					{
						recurrence: {
							ne: 'NEVER'
						}
					},
					{
						or: [
							{
								forever: {
									eq: true
								}
							},
							{
								until: {
									ge: now
								}
							}
						]
					}
				]
			}
		],
	}
};

export const searchUserFilter = (query) => {
	return {
		name: {
			matchPhrasePrefix: query
		}
	};
};

export const searchScheduleFilter = (query, location) => {
	return {
		and: [
			{
				isPublic: {
					ne: false
				},
				location: {
					matchPhrase: location || ''
				}
			},
			{
				or: [
					{
						name: {
							matchPhrasePrefix: query
						}
					},
					{
						description: {
							matchPhrasePrefix: query
						}
					}
				]
			}
		]
	};
};
export const searchEventFilter = (query, location) => {
	return {
		and: [
			{
				isPublic: {
					ne: false
				},
				location: {
					matchPhrase: location || ''
				}
			},
			{
				or: [
					{
						title: {
							matchPhrasePrefix: query
						}
					},
					{
						venue:  {
							matchPhrasePrefix: query
						},
					},
					{
						category:  {
							matchPhrasePrefix: query
						},
					},
					{
						description:  {
							matchPhrasePrefix: query
						},
					}
				]
			}
		]
	};
};
