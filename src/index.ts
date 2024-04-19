import { createServer } from 'node:http';
import server from './server';
import logger from './lib/logger';
import config from './lib/config';

const port = config.PORT ?? 4000;
const httpServer = createServer(server);
httpServer.listen({ port }, () => {
  logger.info(`Server listening on port ${port}`);
});
