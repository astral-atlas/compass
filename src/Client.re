open Belt.Result;
open Belt.Array;

[@bs.deriving abstract]
type t = {
  getUsers: unit => Js.Promise.t(array(User.t)),
};

let getUsersPath = "/users";

let toArray = (toElement, json) => {
  switch (Js.Json.classify(json)) {
    | Js.Json.JSONArray(array) => reduce(
        array,
        Ok([||]),
        (arraySoFarOrError, currentElement) => {
          switch (arraySoFarOrError) {
            | Error(message) => Error(message);
            | Ok(arraySoFar) => {
              switch (toElement(currentElement)) {
                | Ok(element) => Ok(concat(arraySoFar, [|element|]));
                | Error(message) => Error(message);
              }
            }
          }
        }
      );
    | _ => Error("JSON was not an Array");
  }
};

let toUserArray = toArray(element =>
  switch (Js.Json.classify(element)) {
    | Js.Json.JSONObject(dict) => User.userOfJSON(dict);
    | _ => Error("Element was not an object");
  }
);

let createClient = (
  domain: Http.domain,
  httpRequest: Http.request,
) => {
  let getUsersUrl = Http.url(~domain, ~path=getUsersPath, ~query=[||], ~fragment="");
  let getUsers = () => Js.Promise.resolve([||]);
  t(~getUsers);
};