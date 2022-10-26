"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT * FROM users");
        const rows = statement.all();
        return rows;
    }
    getAllUsersName() {
        const statement = this.db.prepare("SELECT name FROM users");
        const rows = statement.all();
        return rows;
    }
    getUserById(userId) {
        const statement = this.db
            .prepare("SELECT * FROM users WHERE user_id = ?");
        const rows = statement.get(userId);
        return rows;
    }
    getUserByName(username) {
        const statement = this.db.prepare("SELECT * FROM users WHERE name=?");
        const rows = statement.all(username);
        return rows;
    }
    createUser(user) {
        if ('role' in user && 'badges' in user) {
            const statement = this.db.prepare("INSERT INTO users (name, email, passw, role, badges) VALUES (?, ?, ?, ?, ?)");
            return statement.run(user.name, user.email, user.password, user.role, user.badges).lastInsertRowid;
        }
        else if ('role' in user) {
            const statement = this.db.prepare("INSERT INTO users (name, email, passw, role) VALUES (?, ?, ?, ?)");
            return statement.run(user.name, user.email, user.password, user.role).lastInsertRowid;
        }
        else {
            const statement = this.db.prepare("INSERT INTO users (user_id, name, email, passw) VALUES (?, ?, ?, ?)");
            return statement.run(user.id, user.name, user.email, user.password).lastInsertRowid;
        }
    }
    updateUser(userId, user) {
        if ('role' in user && 'badges' in user) {
            const statement = this.db.prepare("UPDATE users SET name=?, email=?, passw=?, role=?, badges=? WHERE user_id=" + userId.toString());
            return statement.run(user.name, user.email, user.password, user.role, user.badges).lastInsertRowid;
        }
        else if ('role' in user) {
            const statement = this.db.prepare("UPDATE users SET name=?, email=?, passw=?, role=? WHERE user_id=" + userId.toString());
            return statement.run(user.name, user.email, user.password, user.role).lastInsertRowid;
        }
        else {
            const statement = this.db.prepare("UPDATE users SET user_id=?, name=?, email=?, passw=? WHERE user_id=" + userId.toString());
            return statement.run(user.id, user.name, user.email, user.password).lastInsertRowid;
        }
    }
    softDelUser(id) {
        const statement = this.db.prepare("UPDATE users SET visible=FALSE WHERE user_id=?");
        return statement.run(id).lastInsertRowid;
    }
    login(email, password) {
        const statement = this.db.prepare("SELECT * FROM users where email=? AND passw=?");
        const rows = statement.get(email, password);
        return rows;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map