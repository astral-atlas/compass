// @flow strict

/*::
export type EventEmitter<Event> = {
  emit: Event => void,
  addListener: (listener: Event => void) => () => void,
  listeners: Array<Event => void>,
}
*/

export const createEventEmitter = /*:: <Event>*/()/*: EventEmitter<Event>*/ => {
  const listeners/*: Array<Event => void>*/ = [];

  const emit = (event/*: Event*/) => {
    for (const listener of listeners) {
      listener(event)
    }
  }

  const addListener = (listener) => {
    listeners.push(listener);
    const listenerIndex = listeners.length - 1;
    return () => {
      listeners.splice(listenerIndex, 1);
    }
  }

  return {
    emit,
    addListener,
    listeners,
  }
};
