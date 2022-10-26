import * as express from "express"
import * as UserController from "./userController"
import { User, Admin, Player, Reporter } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/user', (req, res) => {
    const mail: string =   (req.query as any).email
    const password: string = (req.query as any).passw
    const user: (User | Admin | Player | Reporter) = UserController.login(mail,password)

    if (('role' in user) && (user.role == "player")){
        res.status(200).json(UserController.listUsersName())
    }
    else {
      res.status(200).json(UserController.listUsers())
    }
  })
 
  //app.post('/user', (req, res) => {
	//const newUser: User = req.body    
	//res.status(200).json(UserController.addUser(newUser))
  //})

  app.get('/user/:id', (req, res) => {
    const userId: number = parseFloat(req.params.id)
    const email: string = (req.query as any).email
    const passw: string = (req.query as any).passw
    const user: User = UserController.login(email, passw)
    res.status(200).json(UserController.findUserById(userId))
    //res.status(400).json({"error":"Frère t'abuses"})
  })

  app.get('/userbyname/:name', (req, res) => {
    const name: string = req.params.name
    res.status(200).json(UserController.findUserByName(name))
  })

  app.post('/user', (req, res) => {
    const newUser: (User | Admin | Player | Reporter) = req.body
    const mail: string =   (req.query as any).email
    const password: string = (req.query as any).passw
    const user: User | Admin | Player | Reporter = UserController.login(mail,password)
    if (('role' in user) && (user.role == "admin")) {
      const newUser: User = req.body
      res.status(200).json(UserController.addUser(newUser))
    }
    else{
      res.status(400).json({"error":"Not enough credentials"})
    }   
  })

  app.post('/user/:id', (req, res) => {
    const userId: number = parseFloat(req.params.id)
    const updateU: User | Admin | Player | Reporter = req.body
    res.status(200).json(UserController.updateUser(userId,updateU))
  })

  app.put('/user/soft_delete/:id', (req, res) => {
  	const mail: string =   (req.query as any).email
    const password: string = (req.query as any).passw
    const user: User | Admin | Player | Reporter = UserController.login(mail,password)

    if (('role' in user) && (user.role == "admin")) {
      const userId: number = parseFloat(req.params.id)
      res.status(200).json(UserController.softDelUser(userId))
    }
    else{
      res.status(400).json({"error":"Not enough credentials"})
    }
  })
  
}
