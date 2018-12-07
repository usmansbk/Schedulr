export default [{
  title: '12/1/2018',
  data: [{
      id: 1,
      title: 'Dinner with Judie and Barbie krugger',
      description: 'Lorem Ipsum Dolor Amet',
      location: {
        address: 'B13. Faculty of Engineering'
      },
      start: Date.now(),
      end: new Date('12/2/2018'),
      allDay: true,
      isCancelled: false,
      starred: false,
      starsCount: 0,
      commentsCount: 222203,
      repeat: 'WEEKLY',
      type: 'LECTURE',
      group: {
        id: 1,
        name: 'EEEN301'
      }
    },{
      id: 2,
      title: 'Sleeping whole day',
      description: 'Lorem Ipsum Dolor Amet',
      location: {
        address: 'B13. Faculty of Engineering'
      },
      start: Date.now(),
      end: new Date('11/24/2018'),
      allDay: false,
      isCancelled: false,
      starred: false,
      starsCount: 0,
      commentsCount: 0,
      repeat: 'DAILY',
      type: 'REMINDER',
      group: {
        id: 1,
        name: 'EEEN302'
      }
    },{
      id: 3,
      title: 'Fix minor bugs in app',
      description: 'Lorem Ipsum Dolor Amet Kasupda Method dummy schldr visual',
      location: null,
      start: new Date('11/22/2018'),
      end: Date.now(),
      allDay: false,
      isCancelled: true,
      starred: false,
      starsCount: 1234567,
      commentsCount: 0,
      repeat: 'WEEKLY',
      type: 'HOBBY',
      group: {
        id: 1,
        name: 'EEEN303'
      }
    }]
},{
  title: '11/24/2018',
  data: [{
      id: 1,
      title: 'EEEN304',
      description: 'Lorem Ipsum Dolor Amet',
      location: {
        address: 'Theatre A/B. Faculty of Art'
      },
      start: Date.now(),
      end: new Date('11/26/2018'),
      allDay: true,
      isCancelled: false,
      starred: false,
      starsCount: 0,
      commentsCount: 222203,
      repeat: 'WEEKLY',
      type: 'LECTURE',
      group: {
        id: 1,
        name: 'EEEN304'
      }
    },{
      id: 2,
      title: 'CMEN201',
      location: 'No location set',
      start: Date.now(),
      end: Date.now(),
      allDay: false,
      isCancelled: false,
      starred: true,
      starsCount: 2,
      commentsCount: 0,
      repeat: 'DAILY',
      type: 'TASK',
      group: {
        id: 1,
        name: 'CMEN201'
      }
    },{
      id: 3,
      title: 'Exboys week barbaque night',
      description: 'Lorem Ipsum Dolor Amet',
      location: null,
      start: Date.now(),
      end: new Date('11/20/2018'),
      allDay: false,
      isCancelled: false,
      starred: false,
      starsCount: 1234567,
      commentsCount: 0,
      repeat: 'WEEKLY',
      type: 'HOBBY',
      group: {
        id: 1,
        name: 'GENS301'
      }
    },]
}];