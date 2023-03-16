const { expect } = require('chai');
const sinon = require('sinon');
const md5 = require('md5');
const {
  createUserController,
  getUserByIdController,
  getUserByEmailController,
  getAllUsersController,
  userLoginController,
  deleteUserController,
} = require('../../api/controllers/UserController');
const UserService = require('../../api/services/UserService');
const { generateToken } = require('../../api/helper/token');

const INTERNAL_ERROR = 'Erro interno do servidor';
const USER_NOT_FOUND = 'Usuário não encontrado';

describe('UserController', () => {
  describe('createUserController', () => {
    it('should create a new user and return it', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
          role: 'user',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns(null);
      const createUserStub = sinon.stub(UserService, 'createUser').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });

      await createUserController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(createUserStub.calledOnceWith('John Doe', 'johndoe@example.com', md5('123456'), 'user')).to.be.true;
      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      })).to.be.true;

      getUserByEmailStub.restore();
      createUserStub.restore();
    });

    it('should return a 409 status with a message if email already exists', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
          role: 'user',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns({
        id: 1,
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });

      await createUserController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(409)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Email já cadastrado' })).to.be.true;

      getUserByEmailStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
          role: 'user',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').throws('Database error');

      await createUserController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getUserByEmailStub.restore();
    });
  });

  describe('getUserByIdController', () => {
    it('should return a user by id', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        json: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });

      await getUserByIdController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.json.calledOnceWith({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      })).to.be.true;

      getUserByIdStub.restore();
    });

    it('should return a 409 status with a message if user is not found', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').returns(null);

      await getUserByIdController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.status.calledOnceWith(409)).to.be.true;
      expect(res.send.calledOnceWith('Não encontrado')).to.be.true;

      getUserByIdStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').throws('Database error');

      await getUserByIdController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getUserByIdStub.restore();
    });
  });

  describe('getAllUsersController', () => {
    it('should return all users', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getAllUsersStub = sinon.stub(UserService, 'getAllUsers').returns([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: md5('123456'),
          role: 'user',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          password: md5('password'),
          role: 'admin',
        },
      ]);

      await getAllUsersController(req, res);
      expect(getAllUsersStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: md5('123456'),
          role: 'user',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          password: md5('password'),
          role: 'admin',
        },
      ])).to.be.true;

      getAllUsersStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getAllUsersStub = sinon.stub(UserService, 'getAllUsers').throws('Database error');

      await getAllUsersController(req, res);

      expect(getAllUsersStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getAllUsersStub.restore();
    });
  });

  describe('userLoginController', () => {
    it('should return a token when a user logs in successfully', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: '123456',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });
      const getUserByEmailNoPasswordStub = sinon.stub(UserService, 'getUserByEmailNoPassword').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
      });
      const generateTokenStub = sinon.stub().returns('token123');

      await userLoginController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(getUserByEmailNoPasswordStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(generateTokenStub.calledOnceWith({ name: 'John Doe', email: 'johndoe@example.com', role: 'user', id: 1 })).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
        id: 1,
        token: 'token123',
      })).to.be.true;

      getUserByEmailStub.restore();
      getUserByEmailNoPasswordStub.restore();
      generateTokenStub.restore();
    });

    it('should return a 404 status with a message if email does not exist', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: '123456',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns(null);

      await userLoginController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith({ message: USER_NOT_FOUND })).to.be.true;

      getUserByEmailStub.restore();
    });

    it('should return a 400 status with a message if password is invalid', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: 'invalidpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });

      await userLoginController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'invalid password' })).to.be.true;

      getUserByEmailStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: '123456',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').throws('Database error');

      await userLoginController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getUserByEmailStub.restore();
    });
  });

  describe('getUserByEmailController', () => {
    it('should return a user by email', async () => {
      const req = {
        params: {
          email: 'johndoe@example.com',
        },
      };
      const res = {
        json: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      });

      await getUserByEmailController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.json.calledOnceWith({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
      })).to.be.true;

      getUserByEmailStub.restore();
    });

    it('should return a 404 status with a message if user is not found', async () => {
      const req = {
        params: {
          email: 'johndoe@example.com',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').returns(null);

      await getUserByEmailController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.send.calledOnceWith(USER_NOT_FOUND)).to.be.true;

      getUserByEmailStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {
        params: {
          email: 'johndoe@example.com',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByEmailStub = sinon.stub(UserService, 'getUserByEmail').throws('Database error');

      await getUserByEmailController(req, res);

      expect(getUserByEmailStub.calledOnceWith('johndoe@example.com')).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getUserByEmailStub.restore();
    });
  });

  describe('deleteUserController', () => {
    it('should delete a user by id', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').returns({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: md5('123456'),
        role: 'user',
        destroy: sinon.stub(),
      });

      await deleteUserController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Usuário deletado com sucesso' })).to.be.true;

      getUserByIdStub.restore();
    });

    it('should return a 404 status with a message if user is not found', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').returns(null);

      await deleteUserController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith({ message: USER_NOT_FOUND })).to.be.true;

      getUserByIdStub.restore();
    });

    it('should return a 500 status with an error message if an error occurs', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const getUserByIdStub = sinon.stub(UserService, 'getUserById').throws('Database error');

      await deleteUserController(req, res);

      expect(getUserByIdStub.calledOnceWith(1)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith(INTERNAL_ERROR)).to.be.true;

      getUserByIdStub.restore();
    });
  });
});

