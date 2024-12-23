import { Router } from "express";
import { messagesServices } from "../services/messages.services.js"
import { AppResponse } from "../lib/app-response.js";

class MessagesController {

  constructor() {
    this.router = Router();
    this.router.get('/chat-id/:id', this.findById.bind(this))
    this.router.post('/', this.create.bind(this))
  }

  async findById(req, _res, next) {
    try {
      const { id } = req.params;
      const messagesByChatId = await messagesServices.findById(+id);

      next(new AppResponse("GET", { data: messagesByChatId }))
    } catch (error) {
      
    }
  }

  async create(req, _res, next) {
    try {
      const body = req.body;
      const createMessage = await messagesServices.create(body);

      next(new AppResponse("POST", { data: createMessage }));
    } catch (error) {
      next(error)
    }
  }
}

export const messagesControllers = new MessagesController().router;