import { observable, action, computed } from 'mobx';

export default class Notifications {
  @observable items = [...mockNotifications];
  @observable unprocessed = [[], []];
  @observable read = false;

  @computed get hasNotification() {
    return this.items.length && !this.read;
  }

  @action toggleRead = () => {
    this.read = true;
  };

  @action reset = () => {
    this.items = [];
  };

  @action process = (items, type) => {
    this.read = false;
    switch(type) {
      case 'event': {
        this._processEvents(items);
        break;
      };
      case 'board': {
        this._processBoards(items);
        break;
      }
    }
  };

  @action addToList = (items, type) => {
    switch(type) {
      case 'event': {
        this.addToList[0].concat(items);
        break;
      };
      case 'board': {
        this.addToList[1].concat(items);
        break;
      }
    }
  }

  _processEvents = (items) => {
    items.forEach(item => {
      switch(item.aws_ds) {
        case 'CREATE': {
          break;
        };
        case 'UPDATE': {
          break;
        };
        case 'DELETE': {
          break;
        }
      }
    })
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
    message: 'schedule closed',
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
    message: 'comments',
    date: Date.now() - 30000000,
    count: 132,
    tag: 'Update'
  },
  {
    id: 'xdq32294s9zaa',
    pictureUrl: null,
    title: 'Development',
    message: 'schedule opened',
    date: Date.now() + 60000000,
    tag: 'Update'
  },
];