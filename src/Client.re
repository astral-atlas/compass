open Belt;

[@bs.deriving abstract]
type t = {
  getUsers: unit => Js.Promise.t(Result.t(array(User.t), string)),
};

let toUsersArray = Json.Decode.array(User.decode)

let createClient = (
  domain: string,
  httpRequester: Http.requester,
  base64Encoder: Encoding.base64Encoder,
  authentication: Authentication.authenticationStrategy,
) => {
  let authenticationHeader = ("Authorization", switch(authentication) {
    | Authentication.Basic({ username, password }) => "Basic " ++ base64Encoder(username++":"++password);
  });

  let getUsers = () => {
    Js.Promise.(
      httpRequester(~domain, ~path="/users", ~headers=[|authenticationHeader|])
      |> then_(body => Json.parseOrRaise(body) -> toUsersArray -> Result.Ok -> resolve)
    )
  }
  t(~getUsers);
};