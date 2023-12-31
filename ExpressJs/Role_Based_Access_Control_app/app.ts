import './config.js';
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import dataSource from './db/dataSource.js';
import usersRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js'
//import { authenticate } from './middlewares/auth/authenticate.js';

var app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
//app.use('/posts', authenticate, postRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});


app.listen(PORT, () => {
  logger(`App is listening on port ${PORT}`);
  console.log(`App is listening on port ${PORT}`);
});

export default app;
