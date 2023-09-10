// folder has been created to test validity of authorization :
import express from 'express';

import { authorize } from '../middlewares/auth/authorize.js';
var router = express.Router();

router.post('/', authorize('POST_post'), (req, res, next) => {
  res.status(201).send('post has been created successfully');
});

router.get('/', authorize('GET_posts'), (req, res, next) => {
  res.status(201).send('all posts data');
});

export default router;


