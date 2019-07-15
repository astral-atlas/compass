// @flow
/*::
export type Success<TSuccess> = {
  type: 'success',
  success: TSuccess
};

export type Result<TSuccess, TFailure> =
  | Success<TSuccess>
  | { type: 'failure', failure: TFailure };
*/

export const succeed = /*:: <TSuccess>*/(success/*: TSuccess*/)/*: Success<TSuccess>*/ => ({
  type: 'success',
  success,
});