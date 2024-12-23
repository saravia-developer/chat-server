import { Router } from "express";
import { chatsServices } from "../services/chats.services.js"
import { AppResponse } from "../lib/app-response.js";

class ChatsController {

  constructor() {
    this.router = Router();
    this.router.get('/:chatName', this.findByName.bind(this))
    this.router.post('/', this.create.bind(this))
  }

  async findByName(req, _res, next) {
    try {
      const chatName = req.params?.chatName;
      const result = await chatsServices.findByName(chatName);

      next(new AppResponse("GET", { data: result }))
    } catch (error) {
      next(error)
    }
  } 

  async create(req, _res, next) {
    try {
      const body = req.body;
      const createChat = await chatsServices.create(body);

      next(new AppResponse("POST", createChat))
    } catch (error) {
      next(error)
    }
  }
}

export const chatsControllers = new ChatsController().router;