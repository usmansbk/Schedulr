import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { decapitalize } from 'lib/capitalizr';

export default class Updates {
  @persist("list") @observable items = [];
  @observable prevBoards = [];
  @observable prevEvents = [];
  @persist("list") @observable unprocessedEvents = [];
  @persist("list") @observable unprocessedBoards = [];
  @persist @observable seen = false;

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

  @action addToQueue = (items, type, prevItems) => {
    const filtered = items.filter(item => !item.isAuthor);
    switch(type) {
      case 'event': {
        this.unprocessedEvents = this.unprocessedEvents.concat(filtered);
        this.prevEvents = prevItems;
        break;
      };
      case 'board': {
        this.unprocessedBoards = this.unprocessedBoards.concat(filtered);
        this.prevBoards = prevItems;
        break;
      }
    }
    this.seen = false;
  };

  _processEvents = () => {
    this.unprocessedEvents.forEach(item => {
      const type = 'Event';
      const date = item.timestamp * 1000;
      const id = item.id;
      const title = item.title;
      const eventType = decapitalize(item.eventType, true).trim();

      const notif = {
        type,
        date,
        id,
        title,
      };

      switch(item.aws_ds) {
        case 'CREATE': {
          const message = `${eventType ? eventType + ' ' : ''}scheduled for`;
          notif.target = item.startAt;
          notif.message = message;
          this.items.push(notif);
          break;
        };
        case 'UPDATE': {
          const message = this._processEventChanges(item);
          notif.message = message;
          this.items.push(notif);
          break;
        };
        case 'DELETE': {
          const message = `${eventType ? eventType + ' ' : ''}deleted`;
          delete notif.id;
          notif.message = message;
          this.items.push(notif);
          break;
        }
      }
    });
    this.unprocessedEvents = [];
  };

  _processEventChanges = (item) => {
    const changes = [];
    const prevState = this.prevEvents.find(event => event.id === item.id);
    if (prevState) {
      Object.keys(item).forEach(key => {
        const currentVal = item[key];
        const prevVal = prevState[key];
        if ((typeof currentVal !== 'object') && (currentVal !== prevVal)) {
          if (key === 'venue') changes.push("venue");
          if (key === "startAt") changes.push("date");
        }
      })
      if (!changes.length) changes.push(`${item.eventType} details updated`);
    }
    return `${changes.join()} changed`;
  };

  _processBoards = () => {

  };

}