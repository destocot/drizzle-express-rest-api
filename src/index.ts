import { Server, createServer } from "node:http";
import server from "@/server";
import logger from "@/lib/logger";
import config from "@/lib/config";
import { UnhandledExceptionHandlers } from "./lib/utils/error.utils";

const port = config.PORT ?? 4000;
let httpServer: Server;

const start = () => {
  httpServer = createServer(server);

  httpServer.listen({ port }, () => {
    logger.info(`Server listening on port ${port}`);
  });
};

start();

UnhandledExceptionHandlers.initalize();

process.on("SIGTERM", () => {
  logger.info("🛑 Closing http server gracefully...");
  httpServer.close();
});
