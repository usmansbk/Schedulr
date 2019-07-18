import { observable, action, computed } from 'mobx';

export default class Notifications {
  @observable items = [...mockNotifications];
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
    title: 'Bloomberg cancelled',
    message: '24/07/2019',
    date: Date.now(),
    tag: 'Update'
  }
];