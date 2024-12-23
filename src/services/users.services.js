import { database } from "../database/mysql.js";

class UsersServices {
  tableName;

  constructor() {
    this.tableName = "users";
  }

  Users() {
    return database(this.tableName);
  }

  async findById(id) {
    const getUserById = await this.Users().where({ id }).first();
    return getUserById;
  }

  async findByUsername(username) {
    const getUser = await this.Users().where({ username }).first();
    return getUser;
  }

  async create(username) {
    const [createUser] = await this.Users().insert({ username });
    return createUser;
  }
}

export const usersServices = new UsersServices();