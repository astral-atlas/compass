// @flow
import { toObject, toString } from './lib/types';

/*::
export type User = {
  id: string,
  name: string,
};
*/

export const toUser = (value/*: mixed*/)/*: User*/ => {
  const userObject = toObject(value);
  return {
    id: toString(userObject.id),
    name: toString(userObject.name),
  }
}