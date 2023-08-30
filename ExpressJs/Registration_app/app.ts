import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';

//import indexRouter from './routes/index.js';
import usersRouter from './routes/user.routes.js';

import dataSource from './db/dataSource.js';

var app = express();
const PORT = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req:any, res: any , next : any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen (PORT, ()=>{
  logger(`App is listening on port ${PORT}`);
})

export default app;
