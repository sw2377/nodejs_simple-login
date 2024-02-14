"use strict";

class UserStorage {
  static #users = { 
    id: ["nana", "hello"],
    password: ["1234", "world"],
    name: ["nana", "helen"]
  };
  
  static getUsers(...field) {
    const users = this.#users;
    const newUsers = field.reduce((newUsers, current) => {
      if (users.hasOwnProperty(current)) {
        newUsers[current] = users[current]
      }
      return newUsers
    }, {})

    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {})

    return userInfo;
  } 

  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    
    return { success: true };
  }
}

module.exports = UserStorage;