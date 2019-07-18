import { observable, action, computed } from 'mobx';

export default class Notifications {
  @observable notifications = [1, 2, 3];

  @computed get hasNotification() {
    return this.notifications.length;
  }

  @action toggleNotification = () => {
    this.hasNotifications = !this.hasNotifications;
  };

  @action reset = () => {
    this.notifications = [];
  };

  @action process = (items, type) => {
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