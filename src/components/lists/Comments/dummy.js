export default [
  {
    id: 1,
    author: {
      id: 1,
      name: 'Babakolo Usman Suleiman Babakolo Usman',
      pictureUrl: null,
    },
    content: 'Hello worldTo support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents',
    isAuthor: true,
    replying: null,
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
      content: 'Hello worldTo support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intentsHello worldTo support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents',
      author: {
        id: 1,
        name: 'Babakolo Usman'
      }
    },
    createdAt: Date.now()
  },
]