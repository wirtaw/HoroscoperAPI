'use strict';

const user = {
  name: '',
  birthdate: '',
  sign: '',
  getAge: (input) => {
    let birthdate = '';
    const now = new Date();
    if (input !== undefined && input !== '') {
      birthdate = input;
      user.birthdate = input;
    }
    if (birthdate !== '') {
      const dt = new Date(birthdate);
      if (dt !== undefined && dt !== 'Invalid Date' &&
        isNaN(dt.getFullYear()) !== true) {
        return  now.getFullYear() - dt.getFullYear();
      } else {
        birthdate = '';
        user.birthdate = '';
      }
    }
    return birthdate;
  },
  setSign: () => {
    const dt = new Date(user.birthdate);
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    if ((month === 1 && day >= 23) || (month === 2 && day < 23)) {
      user.sign = '1';
    } else if ((month === 2 && day >= 23) || (month === 3 && day < 23)) {
      user.sign = '2';
    } else if ((month === 3 && day >= 23) || (month === 4 && day < 23)) {
      user.sign = '3';
    } else if ((month === 4 && day >= 23) || (month === 5 && day < 23)) {
      user.sign = '4';
    } else if ((month === 5 && day >= 23) || (month === 6 && day < 23)) {
      user.sign = '5';
    } else if ((month === 6 && day >= 23) || (month === 7 && day < 23)) {
      user.sign = '6';
    } else if ((month === 7 && day >= 23) || (month === 8 && day < 23)) {
      user.sign = '7';
    } else if ((month === 8 && day >= 23) || (month === 9 && day < 23)) {
      user.sign = '8';
    } else if ((month === 9 && day >= 23) || (month === 10 && day < 23)) {
      user.sign = '9';
    } else if ((month === 10 && day >= 23) || (month === 11 && day < 23)) {
      user.sign = '10';
    } else if ((month === 11 && day >= 23) || (month === 12 && day < 23)) {
      user.sign = '11';
    } else if ((month === 12 && day >= 23) || (month === 1 && day < 23)) {
      user.sign = '12';
    }
  }
};

module.exports = { user };
