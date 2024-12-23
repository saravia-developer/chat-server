import { database } from "../database/mysql.js"

class ChatsServices {
  tableName

  constructor() {
    this.tableName = "chats"
  }

  Chats() {
    return database(this.tableName)
  }

  async findByName(name) {
    const findChat = await this.Chats().where({ chat_name: name }).first();
    return findChat;
  }

  async create(data) {
    const [chatCreate] = await this.Chats().insert({ chat_name: data });
    return chatCreate;
  }
}

export const chatsServices = new ChatsServices();