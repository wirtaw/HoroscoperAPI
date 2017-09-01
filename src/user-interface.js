'use strict';

const user = {
  name: '',
  birthdate: '',
  sign: '',
  getInfo: (input) => {
    const ageInfo = user.getAge(input);
    user.setSign();
    let info = '';
    if ('' !== ageInfo.toString()) {
      info = `Your sign - ${user.sign}. Age - ${ageInfo}`;
    } else {
      info = 'Wrong birthdate. Please, send correct date!';
    }
    return info;
  },
  getAge: (input) => {
    let birthdate = '';
    const now = new Date();
    if (input !== undefined && input !== '') {
      birthdate = input;
      user.birthdate = input;
    } else {
      user.birthdate = '';
      user.sign = '';
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
    if ((month === 1 && day >= 20) || (month === 2 && day < 19)) {
      user.sign = 'Aquarius';
    } else if ((month === 2 && day >= 19) || (month === 3 && day < 21)) {
      user.sign = 'Pisces';
    } else if ((month === 3 && day >= 21) || (month === 4 && day < 20)) {
      user.sign = 'Ares';
    } else if ((month === 4 && day >= 20) || (month === 5 && day < 21)) {
      user.sign = 'Taurus';
    } else if ((month === 5 && day >= 21) || (month === 6 && day < 21)) {
      user.sign = 'Gemini';
    } else if ((month === 6 && day >= 21) || (month === 7 && day < 23)) {
      user.sign = 'Cancer';
    } else if ((month === 7 && day >= 23) || (month === 8 && day < 23)) {
      user.sign = 'Leo';
    } else if ((month === 8 && day >= 23) || (month === 9 && day < 23)) {
      user.sign = 'Virgo';
    } else if ((month === 9 && day >= 23) || (month === 10 && day < 23)) {
      user.sign = 'Libra';
    } else if ((month === 10 && day >= 23) || (month === 11 && day < 22)) {
      user.sign = 'Scorpio';
    } else if ((month === 11 && day >= 22) || (month === 12 && day < 22)) {
      user.sign = 'Saggitarius';
    } else if ((month === 12 && day >= 22) || (month === 1 && day < 20)) {
      user.sign = 'Capricorn';
    }
  }
};

module.exports = { user };
