type method =
  | GET
  | POST

type header = (string, string);

type domain = string;
type path = string;

type url = {
  domain: domain,
  path: path,
};

type requester = (~domain: string, ~path: string, ~headers: array(header)) => Js.Promise.t(string);