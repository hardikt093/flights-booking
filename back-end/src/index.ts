import logger from './config/logger';
import config from './config/config';
import app from './app';
import AppDataSource from './db/app-data-source';
import http from "http";
import { Server, Socket } from "socket.io";

let server;
server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: config.frontendDomain,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket: Socket) => {
  socket.on("count", (count: number) => {
    console.log(`Received count: ${count}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

AppDataSource.initialize()
  .then(async () => {
    server.listen(config.port, async () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => logger.info(error));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
