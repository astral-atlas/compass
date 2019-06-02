type atlasClient = {
  getUsers: unit => Js.Promise.t(array(Users.user)),
}

type connection = {
  domain: string,
}

let createAtlasClient = (connection) => {
  let getUsers = () => Js.Promise.resolve([||]);
  {
    getUsers: getUsers,
  }
};