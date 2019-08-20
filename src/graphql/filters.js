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
								until: {
									eq: null
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

// updatedAt >= lastSync OR
// recurrence in [DAILY, WEEKLY, WEEKDAYS, MONTYLY, YEARLY] AND (until == null OR until >= lastSync)
