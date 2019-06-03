open Belt.Result;
open Js.Json;

type uuid = string;
type userId = uuid;

[@bs.deriving abstract]
type t = {
  id: userId,
  name: string,
};

let userOfJSON = (dict) => {
  switch (Js.Dict.get(dict, "id")) {
    | None => Error("User ID could not be found");
    | Some(idJson) => {
      switch (classify(idJson)) {
        | JSONString(id) => {
          switch (Js.Dict.get(dict, "name")) {
            | None => Error("User Name could not be found");
            | Some(nameJson) => {
              switch (classify(nameJson)) {
                | JSONString(name) => Ok(t(~name, ~id));
                | _ => Error("Display Name is not a string");
              }
            }
          }
        }
        | _ => Error("User ID is not a string");
      }
    }
  }
};