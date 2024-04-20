import logger from "../logger";

export class UnhandledExceptionHandlers {
  static initalize() {
    process.on("unhandledRejection", (err: Error) => {
      logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
      throw err;
    });

    process.on("uncaughtException", (err: Error) => {
      logger.error(err.name + " - " + err.message);
      logger.error("UNHANDLED EXCEPTION! 💥 Shutting down...");
      process.exit(1);
    });
  }
}
