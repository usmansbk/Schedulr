import moment from 'moment';

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
						or: [
							{
								recurrence: {
									eq: 'DAILY'
								}
							},
							{
								recurrence: {
									eq: 'WEEKLY'
								}
							},
							{
								recurrence: {
									eq: 'WEEKDAYS'
								}
							},
							{
								recurrence: {
									eq: 'MONTHLY'
								}
							},
							{
								recurrence: {
									eq: 'YEARLY'
								}
							},
						]
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

export const searchScheduleFilter = (query) => {
	return {
		and: [
			{
				isPublic: {
					ne: false
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

export const searchEventFilter = (query) => {
	return {
		and: [
			{
				isPublic: {
					ne: false
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