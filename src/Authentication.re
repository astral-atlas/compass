type basicAuth = {
  username: string,
  password: string,
};

type authenticationStrategy =
  | Basic(basicAuth);

let createBasicAuth = (username, password) => {
  Basic({ username, password });
};