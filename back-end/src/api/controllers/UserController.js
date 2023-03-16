const md5 = require('md5');
const {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  getUserByEmailNoPassword,
} = require('../services/UserService');
const { generateToken } = require('../helper/token');

const INTERNAL_ERROR = 'Erro interno do servidor';
const USER_NOT_FOUND = 'Usuário não encontrado';

async function createUserController(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }
    const hashedPassword = md5(password);
    const user = await createUser(name, email, hashedPassword, role);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send(INTERNAL_ERROR);
  }
}

async function getUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(409).send('Não encontrado');
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send(INTERNAL_ERROR);
  }
}

async function getAllUsersController(_req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_ERROR);
  }
}

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) return res.status(404).json({ message: USER_NOT_FOUND });
    if (md5(password) !== user.password) {
      return res.status(400).json(
      { message: 'invalid password' },
      ); 
   }

    const userAnswer = await getUserByEmailNoPassword(email);
    const { name, email: userEmail, role, id } = userAnswer;
    const token = generateToken({ name, email: userEmail, role, id });

    return res.status(200).json({ name, email: userEmail, role, id, token }); 
  } catch (error) {
    console.error(error);
    return res.status(500).send(INTERNAL_ERROR);
  }
}

async function getUserByEmailController(req, res) {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_ERROR);
  }
}

async function deleteUserController(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_ERROR);
  }
}

module.exports = {
  createUserController,
  getUserByIdController,
  getUserByEmailController,
  getAllUsersController,
  userLoginController,
  deleteUserController,
};
