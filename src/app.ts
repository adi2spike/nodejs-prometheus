import * as express from 'express';
import * as helmet from 'helmet';
import * as promster from '@promster/express';
import * as logger from './infrastructure/logger';

export const app = express();
app.use(helmet());
app.use(express.json());
app.get('/', (req, res) => res.send('APP Service!!!'));
app.get('/health', (req, res) => res.send({ status: 'OK' }));
app.use('/metrics', (req, res) => {
  req.statusCode = 200;
  res.setHeader('Content-Type', promster.getContentType());
  res.end(promster.getSummary());
});
app.use(promster.createMiddleware({ app: app as any }));
app.use(logger.RequestLoggerHandler);
app.get('/api/ping1', (req, res) => res.send('pong 1!!!'));
app.get('/api/ping2', (req, res) => res.send('pong 2!!!'));
app.get('/api/ping3', (req, res) => res.send('pong 3!!!'));
app.get('/api/slow', (req, res, next) => {
  setTimeout(() => {
    res.status(200).send('Constant slow');
  }, 2000);
});
app.get('/api/slow_randomly', (req, res, next) => {
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  setTimeout(() => {
    res.status(200).send('Slow randomly');
  }, getRandomNumber(1, 100) * 1000);
});
app.get('/api/internal_error', (req, res, next) => {
  try {
    throw new Error('Something broke...');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/api/client_error', (req, res, next) => {
  try {
    throw new Error('Something broke...');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/api/internal_error', (req, res, next) => {
  try {
    throw new Error('Something broke...');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/error_randomly', (req, res, next) => {
  const shouldError = Date.now() % 3 === 0;
  if (shouldError) {
    res.status(500).send('something wrong');
    return;
  }
  res.status(200).send('Good!');
});

app.get('/api/error_randomly_50', (req, res, next) => {
  const shouldError = Date.now() % 2 === 0;
  if (shouldError) {
    res.status(500).send('something wrong');
    return;
  }
  res.status(200).send('Good!');
});

app.use(logger.ErrorLoggerHandler);
