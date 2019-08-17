// Create schedule
          // optimisticResponse: {
          //  __typename: 'Mutation',
          //  createSchedule: {
          //     "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-3da1831b-9931-4411-9b1d-7f8dc1701ab6",
          //     "name": "Created",
          //     "description": null,
          //     "isPublic": true,
          //     "isOwner": true,
          //     "status": null,
          //     "picture": null,
          //     "author": {
          //       "id": "usmansbk@gmail.com",
          //       "name": "Usman Suleiman Babakolo",
          //       "createdCount": 4,
          //       "__typename": "User"
          //     },
          //     "followersCount": 0,
          //     "eventsCount": 0,
          //     "createdAt": "2019-08-17T13:27:17.363Z",
          //     "updatedAt": "2019-08-17T13:27:17.363Z",
          //     "events": {
          //       "items": [
                  
          //       ],
          //       "nextToken": null,
          //       "__typename": "ModelEventConnection"
          //     },
          //     "__typename": "Schedule"
          //   }
          // }

// Create Comment
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createComment: {
          //     id: "f22b82f1-bd08-400b-b930-06adabf2d5b1",
          //     content: "God bless",
          //     isOwner: true,
          //     to: null,
          //     author: {
          //       id: "usmansbk@gmail.com",
          //       name: "Usman Suleiman Babakolo",
          //       pictureUrl:null,
          //       avatar: {
          //         key: "profile_image/usmansbk@gmail.com10219539.jpeg",
          //         bucket: "schdlre4a77eacabcb468f9af1f2063df20dd7-dev",
          //         __typename:"S3Object"
          //       },
          //       __typename: "User"
          //     },
          //     event: {
          //       id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-2ced63e3-b636-4a8e-b2c6-651dad1932ad",
          //       commentsCount: 1,
          //       __typename: "Event"
          //     },
          //     createdAt: "2019-08-17T10:50:01.389Z",
          //     __typename: "Comment"
          //   }
          // }

// Create Event
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createEvent:           {
          //     id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     title: "Mongolia you",
          //     description: null,
          //     venue: null,
          //     category: null,
          //     startAt: 1566040800000,
          //     endAt: 1566048000000,
          //     allDay: null,
          //     recurrence: "NEVER",
          //     until: null,
          //     isPublic: false,
          //     isOwner: true,
          //     isCancelled: null,
          //     cancelledDates: null,
          //     banner: null,
          //     author: {
          //       id: "usmansbk@gmail.com",
          //       name: "Usman Suleiman Babakolo",
          //       __typename: "User"
          //     },
          //     schedule: {
          //       id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-6209eb54-646b-4a38-803b-16b3da427216",
          //       name: "Mix well I think",
          //       eventsCount: 2,
          //       __typename: "Schedule"
          //     },
          //     commentsCount: 0,
          //     bookmarksCount: 0,
          //     createdAt: "2019-08-17T11:04:03.208Z",
          //     updatedAt: "2019-08-17T11:04:03.208Z",
          //     __typename: "Event"
          //   }
          // }

// Create bookmark
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createBookmark: {
          //     "id": "usmansbk@gmail.com-f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     "event": {
          //       "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       "title": "Mongolia you",
          //       "description": null,
          //       "venue": null,
          //       "category": null,
          //       "startAt": 1566041520000,
          //       "endAt": 1566048720000,
          //       "allDay": false,
          //       "recurrence": "NEVER",
          //       "until": null,
          //       "isPublic": false,
          //       "isOwner": true,
          //       "isCancelled": null,
          //       "cancelledDates": null,
          //       "banner": null,
          //       "author": {
          //         "id": "usmansbk@gmail.com",
          //         "name": "Usman Suleiman Babakolo",
          //         "__typename": "User"
          //       },
          //       "schedule": {
          //         "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-6209eb54-646b-4a38-803b-16b3da427216",
          //         "name": "Mix well I think",
          //         "__typename": "Schedule"
          //       },
          //       "commentsCount": 2,
          //       "bookmarksCount": 1,
          //       "createdAt": "2019-08-17T11:04:03.208Z",
          //       "updatedAt": "2019-08-17T11:29:25.344Z",
          //       "__typename": "Event"
          //     },
          //     "__typename": "Bookmark"
          //   }
          // }

// Delete bookmark
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   deleteBookmark: {
          //     "id": "usmansbk@gmail.com-f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     "event": {
          //       "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       "bookmarksCount": 0,
          //       "__typename": "Event"
          //     },
          //     "__typename": "Bookmark"
          //   }
          // }

// Delete event
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   deleteEvent: {
          //     "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     "schedule": {
          //       "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-6209eb54-646b-4a38-803b-16b3da427216",
          //       "eventsCount": 1,
          //       "__typename": "Schedule"
          //     },
          //     "__typename": "Event"
          //   }
          // }

// Delete comment
          // optimisticResponse: {
          //  __typename: 'Mutation',
          //  deleteComment: {
          //     id: "b21b5828-4abf-46b1-badf-06c667c44005",
          //     event: {
          //       id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       commentsCount: 1,
          //       __typename: "Event"
          //     },
          //     __typename: "Comment"
          //   }
          // }

// Delete schedule
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   deleteSchedule: {
          //     "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-3da1831b-9931-4411-9b1d-7f8dc1701ab6",
          //     "author": {
          //       "id": "usmansbk@gmail.com",
          //       "createdCount": 3,
          //       "__typename": "User"
          //     },
          //     "__typename": "Schedule"
          //   }
          // }