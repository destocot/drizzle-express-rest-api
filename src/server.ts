import express from 'express';
import router from './routes';
import morgan from './middleware/morgan';

const server = express();
server.use(express.json());
server.use(morgan);

server.use('/', router);

export default server;
