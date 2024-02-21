"use strict";

const db = require("../config/db");

class UserStorage {

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);

    // 모든 fields를 가져오고 싶다면 isAll을 true로 설정
    if (isAll) return users; 

    const newUsers = fields.reduce((newUsers, current) => {
      if (users.hasOwnProperty(current)) {
        newUsers[current] = users[current]
      }
      return newUsers
    }, {})

    return newUsers;
  }

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

  // static getUsers(isAll, ...fields) { 
  //   console.log("getUsers");
  // }
  

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      db.query(query, [id], (err, data) => { 
        if (err) reject(err);
        resolve(data[0]);
      })
    })
  } 

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, password) VALUES(?, ?, ?)";
      db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => { 
        if (err) reject(err);
        resolve({ success: true });
      })
    })
  }
}

// console.log(UserStorage.save("idid", "name!", "pwpw", "pwpw"))

module.exports = UserStorage;