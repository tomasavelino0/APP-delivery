const { User } = require('../../database/models');

async function createUser(name, email, password, role) {
  const user = await User.create({ name, email, password, role });
  const nUser = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  return nUser;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function getAllUsers() {
  const user = await User.findAll({
    attributes: ['name', 'email', 'role', 'id'],
  });
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function getUserByEmailNoPassword(email) {
  const user = await User.findOne({
    where: { email },
    attributes: ['name', 'email', 'role', 'id'],
  });
  return user;
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  getUserByEmailNoPassword,
};
