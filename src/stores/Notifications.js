import { observable, action, computed } from 'mobx';

export default class Notifications {
  @observable count = 0;
  @observable notifications = [];

  _increment = (count) => {
    if (count > 0) this.count += count
  };

  @computed get hasNotifications() {
    return this.count > 0;
  }

  @action resetCount = () => this.count = 0;

  @action toggleNotification = () => {
    this.hasNotifications = !this.hasNotifications;
  };

  @action reset = () => {
    this.count = 0;
    this.hasNotifications = false;
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
    this.increment(items.length);
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