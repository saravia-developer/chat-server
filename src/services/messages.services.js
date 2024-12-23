import { database } from "../database/mysql.js";

class MessagesServices {
  tableName;
  tableName2

  constructor() {
    this.tableName = "messages";
    this.tableName2 = "users";
  }

  Messages() {
    return database(this.tableName);
  }

  async findById(id) {
    const result = await this.Messages()
      .join(this.tableName2, "messages.sender_id", "=", `${this.tableName2}.id`)
      .orderBy("timestamp")
      .select("messages.content", `${this.tableName2}.username`)
      .where({ chat_id: id });

    return result;
  }

  async create(data) {
    const { chatId, senderId, content } = data;
    return await this.Messages().insert({
      chat_id: chatId,
      sender_id: senderId,
      content,
    });
  }
}

export const messagesServices = new MessagesServices();
