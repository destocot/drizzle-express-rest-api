import express from "express";
import router from "@/routes";
import morgan from "@/middleware/morgan";
import { errorHandler } from "@/middleware/error-handler";
import { zodErrorHandler } from "@/middleware/zod-error-handler";

const server = express();
server.use(express.json());
server.use(morgan);

server.use("/", router);

server.use(zodErrorHandler);
server.use(errorHandler);

export default server;
