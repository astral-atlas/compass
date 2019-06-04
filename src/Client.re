open Belt;

[@bs.deriving abstract]
type t = {
  getUsers: unit => Js.Promise.t(Result.t(array(User.t), string)),
};

let toUsersArray = Json.Decode.array(User.decode)

let createClient = (
  domain: string,
  httpRequester: Http.requester,
) => {
  let getUsers = () => {
    Js.Promise.(
      httpRequester(~domain, ~path="/users")
      |> then_(body => Json.parseOrRaise(body) -> toUsersArray -> Result.Ok -> resolve)
    )
  }
  t(~getUsers);
};