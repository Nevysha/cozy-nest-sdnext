import { EventEmitter } from 'eventemitter3'

class EventBus extends EventEmitter {

  hasEmitted: string[];

  constructor() {
    super();
    this.hasEmitted = []
  }

  onEver(event, callback, ...args) {

    this.on(event, callback, ...args);

    if (this.has(event)) {
      callback(...args);
    }
  }

  emit(event, ...args) {
    this.hasEmitted.push(event);
    return super.emit(event, ...args);
  }

  has(event) {
    return this.hasEmitted.includes(event);
  }
}

export default new EventBus();
