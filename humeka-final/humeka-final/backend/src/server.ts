import app from './app'
import http from 'http';
import {Server} from 'socket.io';


//@ts-ignore
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

export {io, server}