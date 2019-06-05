type uuid = string;
type userId = uuid;

[@bs.deriving abstract]
type t = {
  id: userId,
  name: string,
};

let decode = json => t(
  ~id=(json |> Json.Decode.field("id", Json.Decode.string)),
  ~name=(json |> Json.Decode.field("name", Json.Decode.string))
);