"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const UserController = __importStar(require("./userController"));
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/user', (req, res) => {
        const mail = req.query.email;
        const password = req.query.passw;
        const user = UserController.login(mail, password);
        if (('role' in user) && (user.role == "player")) {
            res.status(200).json(UserController.listUsersName());
        }
        else {
            res.status(200).json(UserController.listUsers());
        }
    });
    //app.post('/user', (req, res) => {
    //const newUser: User = req.body    
    //res.status(200).json(UserController.addUser(newUser))
    //})
    app.get('/user/:id', (req, res) => {
        const userId = parseFloat(req.params.id);
        const email = req.query.email;
        const passw = req.query.passw;
        const user = UserController.login(email, passw);
        res.status(200).json(UserController.findUserById(userId));
        //res.status(400).json({"error":"Frère t'abuses"})
    });
    app.get('/userbyname/:name', (req, res) => {
        const name = req.params.name;
        res.status(200).json(UserController.findUserByName(name));
    });
    app.post('/user', (req, res) => {
        const newUser = req.body;
        const mail = req.query.email;
        const password = req.query.passw;
        const user = UserController.login(mail, password);
        if (('role' in user) && (user.role == "admin")) {
            const newUser = req.body;
            res.status(200).json(UserController.addUser(newUser));
        }
        else {
            res.status(400).json({ "error": "Not enough credentials" });
        }
    });
    app.post('/user/:id', (req, res) => {
        const userId = parseFloat(req.params.id);
        const updateU = req.body;
        res.status(200).json(UserController.updateUser(userId, updateU));
    });
    app.put('/user/soft_delete/:id', (req, res) => {
        const mail = req.query.email;
        const password = req.query.passw;
        const user = UserController.login(mail, password);
        if (('role' in user) && (user.role == "admin")) {
            const userId = parseFloat(req.params.id);
            res.status(200).json(UserController.softDelUser(userId));
        }
        else {
            res.status(400).json({ "error": "Not enough credentials" });
        }
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map