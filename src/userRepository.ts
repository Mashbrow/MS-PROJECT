import Database from 'better-sqlite3'
import fs from 'fs'
import { User, Player, Admin, Reporter } from './model' //← not needed right now


export default class UserRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
    this.applyMigrations()
    const init_statement = this.db.prepare("INSERT INTO users (name, email, passw, role) VALUES (?, ?, ?, ?)")
    init_statement.run("admin","admin","admin","admin")
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow){
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] = statement.all()
    return rows
  }

  getAllUsersName(): string[] {
    const statement = this.db.prepare("SELECT name FROM users")
    const rows: string[] = statement.all()
    return rows
  }

  getUserById(userId: number) {
	const statement = this.db
        .prepare("SELECT * FROM users WHERE user_id = ?")
	const rows: User[] = statement.get(userId)
	return rows    
  }

  getUserByName(username: string) {
    const statement = this.db.prepare("SELECT * FROM users WHERE name=?")
    const rows: User[] = statement.all(username)
    return rows
  }

  createUser(user: User | Player | Reporter | Admin) {
    if ('role' in user && 'badges' in user){
        const statement = 
        this.db.prepare("INSERT INTO users (name, email, passw, role, badges) VALUES (?, ?, ?, ?, ?)")
        return statement.run(user.name,user.email,user.password,user.role, user.badges).lastInsertRowid
    }
    else if ('role' in user) {
        const statement = 
            this.db.prepare("INSERT INTO users (name, email, passw, role) VALUES (?, ?, ?, ?)")
        return statement.run(user.name,user.email,user.password,user.role).lastInsertRowid
    }
    else {
        const statement = 
            this.db.prepare("INSERT INTO users (user_id, name, email, passw) VALUES (?, ?, ?, ?)")
        return statement.run(user.id, user.name,user.email,user.password).lastInsertRowid
    }
  }

  updateUser(userId: number, user: User | Player | Reporter | Admin) {
    if ('role' in user && 'badges' in user){
      const statement = 
      this.db.prepare("UPDATE users SET name=?, email=?, passw=?, role=?, badges=? WHERE user_id="+userId.toString())
      return statement.run(user.name,user.email,user.password,user.role, user.badges).lastInsertRowid
  }
  else if ('role' in user) {
      const statement = 
          this.db.prepare("UPDATE users SET name=?, email=?, passw=?, role=? WHERE user_id="+userId.toString())
      return statement.run(user.name,user.email,user.password,user.role).lastInsertRowid
  }
  else {
      const statement = 
          this.db.prepare("UPDATE users SET user_id=?, name=?, email=?, passw=? WHERE user_id="+userId.toString())
      return statement.run(user.id, user.name,user.email,user.password).lastInsertRowid
  }
}
softDelUser(id:number){
  const statement =
      this.db.prepare("UPDATE users SET visible=FALSE WHERE user_id=?")
  return statement.run(id).lastInsertRowid
}

login(email: string, password: string){
  const statement =
      this.db.prepare("SELECT * FROM users where email=? AND passw=?")
      const rows: User |Admin | Player | Reporter = statement.get(email, password)
      return rows 
}

}
