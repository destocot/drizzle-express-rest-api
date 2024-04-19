import morgan from 'morgan';
import logger from '../lib/logger';

const stream = {
  write: (message: string) => {
    return logger.http(message);
  },
};

const skip = () => {
  return process.env.NODE_ENV !== 'development';
};

export default morgan('tiny', { stream, skip });
