// test/basic.js
const tap = require('tap')
const userModule = require('../src/user-interface.js');
const user = userModule.user;

// Always call as (found, wanted) by convention
tap.test('User.getAge() test', function (tap) {
  const year = 2017;
  tap.equal(user.getAge('1985-05-09'), (year - 1985));
  tap.equal(user.getAge('1986-05-09'), (year - 1986));
  tap.equal(user.getAge(''), '');
  tap.equal(user.getAge(), '');
  tap.equal(user.getAge('2017-02-30'), (year - 2017));
  tap.equal(user.getAge('1-1-1'), (year - 2001));
  tap.equal(user.getAge('30/30/2000'), '');
  
  tap.end();
});

tap.test('User.getSign() test', function (tap) {
  tap.test('Sign 1', function (tap) {
    user.birthdate = '1985-01-23';
    user.setSign();
    tap.equal(user.sign, '1');

    user.birthdate = '1985-02-05';
    user.setSign();
    tap.equal(user.sign, '1');
    tap.end();
  });
  
  
  tap.end();
});