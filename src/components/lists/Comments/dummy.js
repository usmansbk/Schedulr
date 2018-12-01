export default [
  {
    id: 1,
    author: {
      id: 1,
      name: 'Babakolo Usman Suleiman Babakolo',
      pictureUrl: null,
    },
    content: 'Hello worldTo support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents',
    isAuthor: true,
    replying: {
      id: 2,
      author: {
        id: 1,
        name: 'Babakolo Usman',
      },
      content: 'Hello worldTo'
    },
    createdAt: Date.now()
  },
  {
    id: 2,
    author: {
      id: 1,
      name: 'Babakolo Usman Suleiman',
      pictureUrl: null,
    },
    content: 'Hello worldTo support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents',
    isAuthor: false,
    replying: {
      id: 2,
      name: 'Babakolo Bello',
      pictureUrl: null
    },
    createdAt: Date.now()
  },
]