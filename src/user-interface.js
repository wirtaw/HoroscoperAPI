'use strict';

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const funcWrite = (error, result) => {
  if (error !== null) {
    console.log('error:', error);
    fs.writeFile('output/errors.log', error.toString(), funcWrite);
  } else {
    console.dir({ result });
  }
};

const searchForHoroscope = ($) => {
  const bodyText = $('.psv-horoscopes--container--reading', '#content').text();
  console.dir($('.psv-horoscopes--container--reading', '#content').text());
  return (bodyText) ? bodyText : '';
};

const pageGetter = {
  dayHoroscope: '',
  tommorowHoroscope: '',
  weekHoroscope: '',
  monthHoroscope: ''
};

const getHorsocope = (user, callback) => {
  console.dir(user);
  const sign = (user && user.sign) ? user.sign.toLowerCase() : 'taurus';
  const url = 'https://www.psychicguild.com/' +
    user.type + '-horoscopes/' + sign;
  let result = '';
  request(url, (error, response, body) => {
    if (error !== null && error !== undefined) {
      console.log('error:', error);
      fs.writeFile('output/errors.log', error.toString(), funcWrite);
    } else if (response !== undefined && response !== null &&
      response.statusCode && body !== null && '' !== body) {
      console.log('statusCode:', response && response.statusCode);
      if (response.statusCode === 200) {
        const $ = cheerio.load(body);
        result = searchForHoroscope($);
        console.log('Page title:  ' + $('title').text());
        console.log('Find sign:  ', pageGetter);
      } else {
        fs.writeFile('output/errors.log', 'Response error: ' +
          response.statusCode, funcWrite);
      }
    } else {
      fs.writeFile('output/errors.log', 'unknown', funcWrite);
    }
    callback(result);
  });
};

const funcFinal = (user, pageGetter, callback) => {
  console.dir({ pageGetter });
  const info = `Your sign - ${user.sign}. Age - ${user.ageInfo}`;
  callback(info);
};

const myFirstFunction = (user, pageGetter, callback) => {
  user.type = 'daily';
  user.typeLetter = 'd';
  getHorsocope(user, (horoscope) => {
    callback(horoscope);
  });
};

const mySecondFunction = (user, pageGetter, callback) => {
  user.type = 'weekly';
  user.typeLetter = 'w';
  getHorsocope(user, (horoscope) => {
    callback(horoscope);
  });
};

const myLastFunction = (user, pageGetter, callback) => {
  user.type = 'monthly';
  user.typeLetter = 'm';
  getHorsocope(user, (horoscope) => {
    callback(horoscope);
  });
};

const getInfo = (vm, callback) => {

  myFirstFunction(vm, pageGetter, (result) => {
    pageGetter.dayHoroscope = result;
    mySecondFunction(vm, pageGetter, (result2) => {
      pageGetter.weekHoroscope = result2;
      myLastFunction(vm, pageGetter, (result3) => {
        pageGetter.result3 = result3;
        funcFinal(vm, pageGetter, (info) => {
          callback(info);
        });
      });
    });
  });
};

const setSign = (birthdate) => {
  const dt = new Date(birthdate);
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  let sign = '';
  if ((month === 1 && day >= 20) || (month === 2 && day < 19)) {
    sign = 'Aquarius';
  } else if ((month === 2 && day >= 19) || (month === 3 && day < 21)) {
    sign = 'Pisces';
  } else if ((month === 3 && day >= 21) || (month === 4 && day < 20)) {
    sign = 'Ares';
  } else if ((month === 4 && day >= 20) || (month === 5 && day < 21)) {
    sign = 'Taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day < 21)) {
    sign = 'Gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day < 23)) {
    sign = 'Cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day < 23)) {
    sign = 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day < 23)) {
    sign = 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day < 23)) {
    sign = 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day < 22)) {
    sign = 'Scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day < 22)) {
    sign = 'Saggitarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day < 20)) {
    sign = 'Capricorn';
  }
  return sign;
};

const user = {
  ageInfo: '',
  name: '',
  birthdate: '',
  sign: '',
  type: '',
  typeLetter: '',
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
        user.ageInfo = now.getFullYear() - dt.getFullYear();
        user.sign = setSign(user.birthdate);
      } else {
        user.birthdate = '';
      }
    }
    getInfo(user, (result) => {
      console.dir(result);
    });

    return user.ageInfo;
  }
};

module.exports = { user, pageGetter };
