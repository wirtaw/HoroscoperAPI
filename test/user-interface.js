'use strict'

// test/basic.js
const tap = require('tap')
const userModule = require('../src/user-interface.js');
const user = userModule.user;

// Always call as (found, wanted) by convention
tap.test('User.getInfo() test', (tap) => {


  tap.test('Normal birthdate ', (tap) => {
    const byear = 1985;
    const birthdate = byear + '-05-09';
    const age = user.getAge(birthdate);
    user.setSign();
    const sign = user.sign;
    tap.equal(user.getInfo(birthdate), 'Your sign - ' +
      sign + '. Age - ' + age);

    tap.end();
  });

  tap.test('Empty ', (tap) => {

    user.getAge('');
    user.setSign();

    tap.equal(user.getInfo(''),
      'Wrong birthdate. Please, send correct date!');

    tap.end();
  });

  tap.test('Wrong ', (tap) => {
    const birthdate = '';
    user.getAge(birthdate);
    user.setSign();

    tap.equal(user.getInfo(birthdate),
      'Wrong birthdate. Please, send correct date!');

    tap.end();
  });

  tap.end();
});

tap.test('User.getAge() test', (tap) => {
  const now = new Date();
  const year = now.getFullYear();
  tap.equal(user.getAge('1985-05-09'), (year - 1985));
  tap.equal(user.getAge('1986-05-09'), (year - 1986));
  tap.equal(user.getAge(''), '');
  tap.equal(user.getAge(), '');
  tap.equal(user.getAge('2017-02-30'), (year - 2017));
  tap.equal(user.getAge('1-1-1'), (year - 2001));
  tap.equal(user.getAge('30/30/2000'), '');

  tap.end();
});

tap.test('User.getSign() test', (tap) => {
  tap.test('Sign empty', (tap) => {
    user.birthdate = '';
    user.setSign();
    tap.equal(user.sign, '');

    tap.end();
  });

  tap.test('Sign Aquarius', (tap) => {
    user.birthdate = '1986-01-23';
    user.setSign();
    tap.equal(user.sign, 'Aquarius');

    user.birthdate = '1985-02-05';
    user.setSign();
    tap.equal(user.sign, 'Aquarius');

    user.birthdate = '1975-01-20';
    user.setSign();
    tap.equal(user.sign, 'Aquarius');

    user.birthdate = '1940-02-18';
    user.setSign();
    tap.equal(user.sign, 'Aquarius');
    tap.end();
  });

  tap.test('Sign Pisces', (tap) => {
    user.birthdate = '1986-02-30';
    user.setSign();
    tap.equal(user.sign, 'Pisces');

    user.birthdate = '1985-03-05';
    user.setSign();
    tap.equal(user.sign, 'Pisces');

    user.birthdate = '1975-02-19';
    user.setSign();
    tap.equal(user.sign, 'Pisces');

    user.birthdate = '1940-03-20';
    user.setSign();
    tap.equal(user.sign, 'Pisces');
    tap.end();
  });

  tap.test('Sign Ares', (tap) => {
    user.birthdate = '1986-03-30';
    user.setSign();
    tap.equal(user.sign, 'Ares');

    user.birthdate = '1985-04-05';
    user.setSign();
    tap.equal(user.sign, 'Ares');

    user.birthdate = '1975-03-21';
    user.setSign();
    tap.equal(user.sign, 'Ares');

    user.birthdate = '1940-04-19';
    user.setSign();
    tap.equal(user.sign, 'Ares');
    tap.end();
  });

  tap.test('Sign Taurus', (tap) => {
    user.birthdate = '1986-04-30';
    user.setSign();
    tap.equal(user.sign, 'Taurus');

    user.birthdate = '1985-05-05';
    user.setSign();
    tap.equal(user.sign, 'Taurus');

    user.birthdate = '1975-04-21';
    user.setSign();
    tap.equal(user.sign, 'Taurus');

    user.birthdate = '1940-05-20';
    user.setSign();
    tap.equal(user.sign, 'Taurus');
    tap.end();
  });

  tap.test('Sign Gemini', (tap) => {
    user.birthdate = '1986-05-30';
    user.setSign();
    tap.equal(user.sign, 'Gemini');

    user.birthdate = '1994-06-06';
    user.setSign();
    tap.equal(user.sign, 'Gemini');

    user.birthdate = '1975-05-21';
    user.setSign();
    tap.equal(user.sign, 'Gemini');

    user.birthdate = '1940-06-20';
    user.setSign();
    tap.equal(user.sign, 'Gemini');
    tap.end();
  });

  tap.test('Sign Cancer', (tap) => {
    user.birthdate = '1986-06-30';
    user.setSign();
    tap.equal(user.sign, 'Cancer');

    user.birthdate = '1994-07-06';
    user.setSign();
    tap.equal(user.sign, 'Cancer');

    user.birthdate = '1975-06-21';
    user.setSign();
    tap.equal(user.sign, 'Cancer');

    user.birthdate = '1940-07-22';
    user.setSign();
    tap.equal(user.sign, 'Cancer');
    tap.end();
  });

  tap.test('Sign Leo', (tap) => {
    user.birthdate = '1986-07-30';
    user.setSign();
    tap.equal(user.sign, 'Leo');

    user.birthdate = '1994-08-06';
    user.setSign();
    tap.equal(user.sign, 'Leo');

    user.birthdate = '1975-07-23';
    user.setSign();
    tap.equal(user.sign, 'Leo');

    user.birthdate = '1940-08-22';
    user.setSign();
    tap.equal(user.sign, 'Leo');
    tap.end();
  });

  tap.test('Sign Virgo', (tap) => {
    user.birthdate = '1986-08-30';
    user.setSign();
    tap.equal(user.sign, 'Virgo');

    user.birthdate = '1994-09-06';
    user.setSign();
    tap.equal(user.sign, 'Virgo');

    user.birthdate = '1975-08-23';
    user.setSign();
    tap.equal(user.sign, 'Virgo');

    user.birthdate = '1940-09-22';
    user.setSign();
    tap.equal(user.sign, 'Virgo');
    tap.end();
  });

  tap.test('Sign Libra', (tap) => {
    user.birthdate = '1986-09-30';
    user.setSign();
    tap.equal(user.sign, 'Libra');

    user.birthdate = '1994-10-06';
    user.setSign();
    tap.equal(user.sign, 'Libra');

    user.birthdate = '1975-09-23';
    user.setSign();
    tap.equal(user.sign, 'Libra');

    user.birthdate = '1940-10-22';
    user.setSign();
    tap.equal(user.sign, 'Libra');
    tap.end();
  });

  tap.test('Sign Scorpio', (tap) => {
    user.birthdate = '1986-10-30';
    user.setSign();
    tap.equal(user.sign, 'Scorpio');

    user.birthdate = '1994-11-06';
    user.setSign();
    tap.equal(user.sign, 'Scorpio');

    user.birthdate = '1975-10-23';
    user.setSign();
    tap.equal(user.sign, 'Scorpio');

    user.birthdate = '1940-11-21';
    user.setSign();
    tap.equal(user.sign, 'Scorpio');
    tap.end();
  });

  tap.test('Sign Saggitarius', (tap) => {
    user.birthdate = '1986-11-30';
    user.setSign();
    tap.equal(user.sign, 'Saggitarius');

    user.birthdate = '1994-12-06';
    user.setSign();
    tap.equal(user.sign, 'Saggitarius');

    user.birthdate = '1975-11-22';
    user.setSign();
    tap.equal(user.sign, 'Saggitarius');

    user.birthdate = '1940-12-21';
    user.setSign();
    tap.equal(user.sign, 'Saggitarius');
    tap.end();
  });
  tap.test('Sign Capricorn', (tap) => {
    user.birthdate = '1986-12-30';
    user.setSign();
    tap.equal(user.sign, 'Capricorn');

    user.birthdate = '1994-01-06';
    user.setSign();
    tap.equal(user.sign, 'Capricorn');

    user.birthdate = '1975-12-22';
    user.setSign();
    tap.equal(user.sign, 'Capricorn');

    user.birthdate = '1940-01-19';
    user.setSign();
    tap.equal(user.sign, 'Capricorn');
    tap.end();
  });

  tap.end();
})
