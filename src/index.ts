import { createServer } from "node:http";
import server from "./server";
import logger from "./lib/logger";
import config from "./lib/config";
import { DrizzleError } from "drizzle-orm";

const port = config.PORT ?? 4000;
const httpServer = createServer(server);
httpServer.listen({ port }, () => {
  logger.info(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err);
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.log(err);
  logger.error("UNHANDLED EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

process.on("SIGTERM", () => {
  logger.info("🛑 Closing http server gracefully...");
  httpServer.close();
});
