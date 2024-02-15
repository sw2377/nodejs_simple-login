"use strict";

const fs = require("fs").promises;

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

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json") // promise를 반환
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch((err) => console.error(err))
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/databases/users.json") // promise를 반환
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch((err) => console.error(err))
  } 

  static async save(userInfo) {
    const users = await this.getUsers(true);
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다."
    }

    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    
    // 데이터 추가 : fs.writeFile(저장할 파일의 경로, 저장할 데이터)
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));

    return { success: true };
  }
}

// console.log(UserStorage.save("idid", "name!", "pwpw", "pwpw"))

module.exports = UserStorage;