type uuid = string;
type userId = uuid;

type t = {
  id: userId,
  name: string,
};

let decode = json => Json.Decode.{
  id: json |> field("id", string),
  name: json |> field("name", string),
}