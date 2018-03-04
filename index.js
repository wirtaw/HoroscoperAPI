'use strict';


global.api = {};
api.http = require('http');
const userModule = require('./src/user-interface.js');
const user = userModule.user;
const getInfo = userModule.getInfo;

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.getAge(null),
  '/user/*': (client, par) => 'parameter=' + par[0],
  '/date/*': (client, par) => getInfo(par[0], user, function(result) {
    callback(result);
  })
};

const types = {
  object: o => JSON.stringify(o),
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par)
};

const matching = [];
let key, rx;
for (key in routing) {
  if (key.includes('*')) {
    rx = new RegExp(key.replace('*', '(.*)'));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

function router(client) {
  let rx, par;
  let route = routing[client.req.url];
  if (route === undefined) {
    for (let i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];
      par = client.req.url.match(rx[0]);
      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  const renderer = types[typeof(route)];
  return renderer(route, par, client);
}

api.http.createServer((req, res) => {
  res.end(router({ req, res }) + '');
}).listen(8080);
