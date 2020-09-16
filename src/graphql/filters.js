import {toISOString} from 'lib/date';

export const pastEventsFilter = (before) => {
  const time = toISOString(before);
  return {
    or: [
      {
        and: [
          {
            endAt: {
              lt: time,
            },
          },
          {
            recurrence: {
              eq: 'NEVER',
            },
          },
        ],
      },
      {
        and: [
          {
            recurrence: {
              ne: 'NEVER',
            },
          },
          {
            until: {
              lt: time,
            },
          },
        ],
      },
    ],
  };
};

export const deltaEventsFilter = (timestamp) => {
  const lastSync = toISOString(timestamp);
  return {
    updatedAt: {
      gt: lastSync,
    },
  };
};

export const baseEventsFilter = () => {
  const now = toISOString();
  return {
    or: [
      {
        endAt: {
          ge: now,
        },
      },
      {
        and: [
          {
            recurrence: {
              ne: 'NEVER',
            },
          },
          {
            or: [
              {
                forever: {
                  eq: true,
                },
              },
              {
                until: {
                  ge: now,
                },
              },
              {
                and: [
                  {
                    forever: {
                      ne: true,
                    },
                  },
                  {
                    until: {
                      notContains: ':', // equivalent of notExists(until) or until === null
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};

export const searchScheduleFilter = (query, location) => {
  return {
    isPublic: {
      eq: true,
    },
    name: {
      contains: query,
    },
    location: {
      eq: location,
    },
  };
};
export const searchEventFilter = (query, location) => {
  return {
    isPublic: {
      eq: true,
    },
    title: {
      contains: query,
    },
    location: {
      eq: location,
    },
  };
};
