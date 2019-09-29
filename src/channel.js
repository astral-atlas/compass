// @flow strict
/*::
import type { SessionID, Session } from '@astral-atlas/contour';
import type { Compass} from './compass';
*/
import { createEventEmitter } from './eventEmitter';

/*::
type Channel = {

}
*/

const channelReducer = () => {

};

const createChannel = (compass/*: Compass*/) => {
  let state = {
    sessions: new Map(),
  };
  const sessionEmitter = createEventEmitter/*:: <Session>*/();

  const awakeResource = async () => {
    const sessionsResult = await compass.session.getSessions();
    if (sessionsResult.type === 'failure')
      return;
    
  }

  const onResourcesChange = () => {

  };

  const on = (eventName, eventListener) => {
    switch (eventName) {
      case 'sessions':
        const removeEmitter = sessionEmitter.addListener(eventListener);
      default:
        throw new Error();
    }
  };

  return {
    on
  };
};