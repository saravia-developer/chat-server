import { Router } from "express";
import { usersServices } from "../services/users.services.js";
import { AppResponse } from "../lib/app-response.js";
import { chatsServices } from "../services/chats.services.js";
import { chatMembersServices } from "../services/chat-members.js";
import { GenerateJWT } from "../lib/generate-jwt.js";

class UsersController {
  constructor() {
    this.router = Router();
    this.router.get("/username/:username", this.findByUsername.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.post("/user-in-chat", this.createAndJoinChat.bind(this));
  }

  async findByUsername(req, _res, next) {
    try {
      const username = req.params?.username;
      const result = await usersServices.findByUsername(username);

      next(new AppResponse("GET", { data: result }));
    } catch (error) {
      next(error);
    }
  }

  async create(req, _res, next) {
    try {
      const body = req.body;
      const createUser = await usersServices.create(body);

      next(new AppResponse("POST", createUser));
    } catch (error) {
      next(error);
    }
  }

  async createAndJoinChat(req, _res, next) {
    try {
      const { name, chatJoin } = req.body;
      const args = { idUser: null, idChat: null };

      const findUser = await usersServices.findByUsername(name);

      if (!findUser) {
        const createUser = await usersServices.create(name);
        args.idUser = createUser;
      } else {
        args.idUser = findUser?.id
      }

      const findChat = await chatsServices.findByName(chatJoin);
      if (!findChat) {
        const createChat = await chatsServices.create(chatJoin);
        args.idChat = createChat;
      } else {
        args.idChat = findChat?.id
      }

      await chatMembersServices.create(args);
      
      next(new AppResponse("POST", { data: args }));
    } catch (err) {
      next(err);
    }
  }
}

export const usersControllers = new UsersController().router;
