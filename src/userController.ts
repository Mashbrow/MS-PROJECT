import { User, Admin, Player, Reporter } from './model'
import UserRepository from './userRepository'

const userRepository = new UserRepository()
const axios = require('axios');

const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/'
const typedUsers: User[] = []

// TODO: implement and export
/*function findUser (userId: number): User {
  for (var u of typedUsers){
    if (u.id === userId){
      return u
    } 
  }
};
*/
const login = (email: string, passw: string) => {
  return userRepository.login(email, passw)
}

const findUserById = (id:number) => {
  return userRepository.getUserById(id)
}

const findUserByName = (username: string) => {
  return userRepository.getUserByName(username)
}

const listUsers = () => {
  return userRepository.getAllUsers()
}

const listUsersName = () => {
  return userRepository.getAllUsersName()
}

const addUser = (newUser: User | Admin | Player | Reporter) => {
  userRepository.createUser(newUser)
  return userRepository.getAllUsers()
}

const updateUser = (id: number, updateUser: User | Admin | Player | Reporter) => {
  userRepository.updateUser(id, updateUser)
  return userRepository.getAllUsers()
}

const softDelUser = (id:number) => {
  userRepository.softDelUser(id)
}

const getPokemons: () => Promise<any> = () => {  
  return axios.get(pokemonsUrl)
}


export { listUsers, listUsersName, addUser, findUserById, findUserByName, updateUser, softDelUser, login }
