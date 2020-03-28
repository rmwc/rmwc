export class EventEmitter {
  events_: { [evtName: string]: Array<Function> } = {};
  on(event: string, cb: Function) {
    this.events_ = this.events_ || {};
    this.events_[event] = this.events_[event] || [];
    this.events_[event].push(cb);
  }
  off(event: string, cb: Function) {
    this.events_ = this.events_ || {};
    if (event in this.events_ === false) return;
    this.events_[event].splice(this.events_[event].indexOf(cb), 1);
  }
  trigger(event: string, ...args: any) {
    this.events_ = this.events_ || {};
    if (event in this.events_ === false) return;
    for (var i = 0; i < this.events_[event].length; i++) {
      this.events_[event][i].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    }
  }
}

export class ArrayEmitter<T> extends EventEmitter {
  array: T[] = [];
  push(...items: T[]) {
    const rVal = this.array.push(...items);
    this.trigger('change');
    return rVal;
  }
  empty() {
    this.array.length = 0;
    this.trigger('change');
  }
  remove(item: T) {
    const index = this.array.indexOf(item);

    if (index > -1) {
      this.array.splice(index, 1);
      this.trigger('change');
      return true;
    }
    return false;
  }
}
