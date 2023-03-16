const express = require('express');

const router = express.Router();
const tokenMiddleware = require('../helper/authMiddleware');

const {
  createUserController,
  getUserByIdController,
  getUserByEmailController,
  getAllUsersController,
  userLoginController,
  deleteUserController,
} = require('../controllers/UserController');

// Nos requisitos necessários, adicione o tokenMiddleware

router.post('/register', createUserController);
router.post('/admregister', tokenMiddleware, createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.post('/login', userLoginController);
router.get('/email/:email', getUserByEmailController);
router.delete('/:id', deleteUserController);

module.exports = router;
