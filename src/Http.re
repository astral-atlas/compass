type method =
  | GET
  | POST

type header = (string, string);

type domain = string;
type path = string;

[@bs.deriving abstract]
type url = {
  domain: domain,
  path: path,
  query: array((string, string)),
  fragment: string,
};

type request = (url, method, array(header)) => Js.Promise.t(string);