import express from 'express';
import ApplicationError from './Erorrs/ApplicationError';
import routes from './routes';

const app = express();

app.use('/', routes);
app.use((err: object, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ApplicationError) {
    res.status(err.code).json(err.messages);
    return;
  }
  console.log(err);

  res.status(500).json('UnExpected Error Occurred, Please Call Us');
});

export default app;
