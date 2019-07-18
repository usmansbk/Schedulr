import { observable, action, computed } from 'mobx';
import moment from 'moment';

export default class Notifications {
  @observable items = [];
  @observable unprocessedEvents = [];
  @observable unprocessedBoards = [];
  @observable seen = false;

  @computed get hasNotification() {
    return Boolean(this.items.length ||
      this.unprocessedBoards.length ||
      this.unprocessedEvents.length
    ) && !this.seen;
  }

  @action toggleRead = () => {
    this.seen = !this.seen;
  };

  @action reset = () => {
    this.items = [];
    this.unprocessedBoards = [];
    this.unprocessedBoards = [];
    this.seen = false;
  };

  @action process = () => {
    this._processEvents();
    this._processBoards();
    this.seen = true;
  };

  @action addToQueue = (items, type) => {
    switch(type) {
      case 'event': {
        this.unprocessedEvents.concat(items);
        break;
      };
      case 'board': {
        this.unprocessedBoards.concat(items);
        break;
      }
    }
    this.seen = false;
  };

  _processEvents = () => {
    this.unprocessedEvents.forEach(item => {
      const type = 'Event';
      const date = moment(item.updatedAt).fromNow();
      const id = item.id;
      const title = item.title;

      switch(item.aws_ds) {
        case 'CREATE': {
          const message = `scheduled on ${moment(item.startAt).toDate().toDateString()}`;
          this.items.push({
            id,
            title,
            message,
            date,
            type
          });
          break;
        };
        case 'UPDATE': {
          break;
        };
        case 'DELETE': {
          const message = "deleted";
          this.items.push({
            id,
            title,
            message,
            date,
            type
          });
        }
      }
    })
  };

  _processBoards = () => {

  }

}

const mockNotifications = [
  {
    id: 'xdq2294s9z',
    pictureUrl: null,
    title: 'Kronos Quartet',
    message: 'cancelled',
    date: Date.now(),
    tag: 'Update'
  },
  {
    id: 'xdq2294s9za',
    pictureUrl: null,
    title: 'Test notification',
    message: 'details updated',
    date: Date.now(),
    tag: 'Update'
  },
  {
    id: 'xdq2294s9zaa',
    pictureUrl: null,
    title: 'Development',
    message: 'closed',
    date: Date.now() - 50000,
    tag: 'Update'
  },
  {
    id: 'xdqa2294s9zaa',
    pictureUrl: null,
    title: 'EEEN509',
    message: 'deleted',
    date: Date.now() - 50000000,
    tag: 'Delete'
  },
  {
    id: 'xdqa2294329zaa',
    pictureUrl: null,
    title: 'EEEN513',
    message: 'time changed',
    date: Date.now() - 40000000,
    tag: 'Update'
  },
  {
    id: 'xdqa2294329z7a',
    pictureUrl: null,
    title: 'EEEN501',
    message: 'location changed',
    date: Date.now() - 30000000,
    tag: 'Update'
  },
  {
    id: 'xdqa2294329z7akl',
    pictureUrl: null,
    title: 'EEEN502',
    message: 'has new comments',
    count: 132,
    tag: 'Update'
  },
  {
    id: 'xdq32294s9zaa',
    pictureUrl: null,
    title: 'Development',
    message: 'opened',
    date: Date.now() + 60000000,
    tag: 'Update'
  },
  {
    id: 'xdq32294s9zbaa',
    pictureUrl: null,
    title: 'Hello kitty and',
    message: 'info updated',
    date: Date.now() + 60000000,
    tag: 'Update'
  },
];