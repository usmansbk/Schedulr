import moment from "moment";

export const baseEventsFilter = timestamp => {
	const lastSync = moment().toISOString();
	return {
		and: [
			{
				until: {
					eq: null
				}
			},
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
			}
		]
	}
};

// updatedAt >= lastSync OR
// recurrence in [DAILY, WEEKLY, WEEKDAYS, MONTYLY, YEARLY] AND (until == null OR until >= lastSync)
