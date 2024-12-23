import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { usersControllers } from './controllers/users.controller.js'
import { messagesControllers } from './controllers/messages.controller.js'
import { chatsControllers } from './controllers/chats.controller.js'
import { requestEnd, requestStart } from './utils/request.interceptor.js';
import { messagesServices } from './services/messages.services.js';
import { HttpCode, statusResponse } from './lib/http-status-codes.js';
import { usersServices } from './services/users.services.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 10
  }
});
const clients = new Set();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors({ origin: "*" }))
app.use(requestStart);
app.use('/users', usersControllers);
app.use('/messages', messagesControllers);
app.use('/chats', chatsControllers);
app.use(requestEnd);

app.get('/', (req, res) => {
  res.send("<h1>Esta API se encuentra levantada</h1>")
});

app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ success: false, kindMessage: statusResponse.NOT_FOUND });
});

app.use(
  (err, req, res, _next) => {
    res.status(err.httpCode).json(err);
  }
);

io.on('connection', (socket) => {
  clients.add(socket);


  socket.on("disconnect", (reason) => {
    console.log(`Cliente desconectado: ${socket.id}, Razón: ${reason}`);
  });

  socket.on('chat message', async (msg) => {
    let user;
    
    try {
      const msgParse = JSON.parse(msg);
      user = await usersServices.findById(msgParse.senderId);
      await messagesServices.create(msgParse)
      
      socket.emit('chat message', msg, user.username);
      // console.log("Message created")
    } catch (error) {
      console.error(error);
      return;
    }

  });

  socket.on("get messages", async (idChat) => {
    let getMessages;
    try {
      getMessages = await messagesServices.findById(idChat);

      socket.emit("get messages", getMessages);
    } catch (error) {
      console.error(error);
      return
    }

  })
});

function closeInactiveConnections() {
  const now = Date.now();
  clients.forEach((lastActive, socketId) => {
    if (now - lastActive > 30000) { // 30 segundos de inactividad
      const socket = io.sockets.sockets.get(socketId);
      if (socket) {
        console.log(`Cerrando conexión inactiva: ${socketId}`);
        socket.disconnect(true);
        clients.delete(socketId); // Eliminar del registro
      }
    }
  });
}

setInterval(closeInactiveConnections, 30000);



export default server