import { database } from "../database/mysql.js";

class ChatMembersServices {
  tableName;

  constructor() {
    this.tableName = "chat_members";
  }

  ChatsMembers() {
    return database(this.tableName);
  }

  async create({ idUser, idChat }) {
    return await this.ChatsMembers().insert({ chat_id: idChat, user_id: idUser })
  }
}

export const chatMembersServices = new ChatMembersServices()