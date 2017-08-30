'use strict';

const user = {
  name: 'vova',
  birthdate: '1985-05-09',
  getAge: (input) => {
    let birthdate;
    if (input !== undefined) {
      birthdate = input;
      user.birthdate = input;
    } else {
      birthdate = user.birthdate;
    }
    const dt = new Date(birthdate);
    const now = new Date();
    if (dt !== undefined && dt !== 'Invalid Date') {
      return  now.getFullYear() - dt.getFullYear();
    }
    return this.birthdate;
  }
};

module.exports = { user };
