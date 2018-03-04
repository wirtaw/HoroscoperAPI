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

const searchForHoroscope = function($) {
  let result = '';
  const bodyText = $('html > body').text();
  const start = 'YesterdayTodayTomorrow';
  const end = 'By AstroGirl';
  const lines = bodyText.split('\n');
  let read = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (true === read && -1 === line.indexOf(end)) {
      result += line;
    }
    if (false === read && -1 < line.indexOf(start)) {
      read = true;
    }
    if (true === read && -1 < line.indexOf(end)) {
      read = false;
    }
  }
  return result;
};

const pageGetter = {
  dayHoroscope: '',
  tommorowHoroscope: '',
  weekHoroscope: '',
  monthHoroscope: ''
};

const getHorsocope = function(user, callback) {
  const url = 'http://www.psychicguild.com/' +
    user.type + '-Horoscope/' + user.sign + '?' + user.typeLetter + '=1';
  let result = '';
  request(url, function(error, response, body) {
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

const funcFinal = function(user, pageGetter, callback) {
  console.dir({ pageGetter });
  const info = `Your sign - ${user.sign}. Age - ${user.ageInfo}`;
  callback(info);
};

const myFirstFunction = function(user, pageGetter, callback) {
  user.type = 'Daily';
  user.typeLetter = 'd';
  getHorsocope(user, function(horoscope) {
    callback(horoscope);
  });
};

const mySecondFunction = function(user, pageGetter, callback) {
  user.type = 'Weekly';
  user.typeLetter = 'w';
  getHorsocope(user, function(horoscope) {
    callback(horoscope);
  });
};

const myLastFunction = function(user, pageGetter, callback) {
  user.type = 'Montly';
  user.typeLetter = 'm';
  getHorsocope(user, function(horoscope) {
    callback(horoscope);
  });
};

const getInfo = function(input, user, callback) {

  console.dir({ user });
  const ageInfo = user.getAge(input);
  user.setSign();
  let info = '';
  if ('' !== ageInfo.toString()) {
    myFirstFunction(user, pageGetter, function(result) {
      pageGetter.dayHoroscope = result;
      mySecondFunction(user, pageGetter, function(result2) {
        pageGetter.weekHoroscope = result2;
        myLastFunction(user, pageGetter, function(result3) {
          pageGetter.result3 = result3;
          funcFinal(user, pageGetter, function(info) {
            callback(info);
          });
        });
      });
    });
    //info = `Your sign - ${user.sign}. Age - ${ageInfo}`;
    //return info;
  } else {
    info = 'Wrong birthdate. Please, send correct date!';
    callback(info);
  }
};

const input = '';

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
        return user.ageInfo;
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
  },
  getInfo: getInfo(input, user, function(result) {
    return result;
  })
};

module.exports = { user, pageGetter, getInfo };
