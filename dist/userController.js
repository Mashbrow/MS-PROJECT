"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.softDelUser = exports.updateUser = exports.findUserByName = exports.findUserById = exports.addUser = exports.listUsersName = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const userRepository = new userRepository_1.default();
const axios = require('axios');
const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/';
const typedUsers = [];
// TODO: implement and export
/*function findUser (userId: number): User {
  for (var u of typedUsers){
    if (u.id === userId){
      return u
    }
  }
};
*/
const login = (email, passw) => {
    return userRepository.login(email, passw);
};
exports.login = login;
const findUserById = (id) => {
    return userRepository.getUserById(id);
};
exports.findUserById = findUserById;
const findUserByName = (username) => {
    return userRepository.getUserByName(username);
};
exports.findUserByName = findUserByName;
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const listUsersName = () => {
    return userRepository.getAllUsersName();
};
exports.listUsersName = listUsersName;
const addUser = (newUser) => {
    userRepository.createUser(newUser);
    return userRepository.getAllUsers();
};
exports.addUser = addUser;
const updateUser = (id, updateUser) => {
    userRepository.updateUser(id, updateUser);
    return userRepository.getAllUsers();
};
exports.updateUser = updateUser;
const softDelUser = (id) => {
    userRepository.softDelUser(id);
};
exports.softDelUser = softDelUser;
const getPokemons = () => {
    return axios.get(pokemonsUrl);
};
//# sourceMappingURL=userController.js.map