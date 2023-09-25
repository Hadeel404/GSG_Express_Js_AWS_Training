import express from 'express';
import { validateUser } from '../middlewares/validation/user.js';
import { insertUser, insertRole, insertPermission, assignRole , getUser,getRoles } from '../controllers/user.controller.js';

var router = express.Router();

// Create user route:
router.post('/', validateUser, (req, res, next) => {
  insertUser(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Create role route:
router.post('/role', (req, res, next) => {
  insertRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Create permission route:
router.post('/permission', (req, res, next) => {
  insertPermission(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Assign role to user route:
router.put('/assignRole/:id', async (req, res, next) => {
  try{
    const user = await assignRole(req, res);
    res.status(200).send(user);
  }catch(error){
    res.status(500).send(error);
  }
});

// Get user(with roles) route:
router.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUser(req, res);
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
}
});

// Get roles route:
router.get('/roles', async (req, res, next) => {
  try {
    const roles = await getRoles();
    res.send(roles);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
