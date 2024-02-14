"use strict";

const fs = require("fs").promises;

class UserStorage {

  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {})

    return userInfo;
  }
  
  static getUsers(...field) {
    // const users = this.#users;
    const newUsers = field.reduce((newUsers, current) => {
      if (users.hasOwnProperty(current)) {
        newUsers[current] = users[current]
      }
      return newUsers
    }, {})

    return newUsers;
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/databases/users.json") // promise를 반환
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch((err) => console.error(err))
  } 

  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    
    return { success: true };
  }
}

module.exports = UserStorage;