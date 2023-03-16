import axios from 'axios';

const PORT = process.env.PORT || '3001';

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

const APP_JSON = 'application/json';

export const getAllUsers = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};

export const createUser = async (reqBody) => {
  const config = {
    headers: {
      'Content-Type': APP_JSON,
    },
  };
  const response = await api.post(
    '/user/register',
    reqBody, // Corpo da requisição
    config,
  );
  return response.data;
};

export const createUserAdm = async (reqBody, token) => {
  const config = {
    headers: {
      'Content-Type': APP_JSON,
      authorization: token,
    },
  };
  const response = await api.post(
    '/user/admregister',
    reqBody, // Corpo da requisição
    config,
  );
  return response;
};

export const login = async (reqBody) => {
  const config = {
    headers: {
      'Content-Type': APP_JSON,
    },
  };
  const response = await api.post(
    '/user/login',
    reqBody, // Corpo da requisição
    config,
  );
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await api.get(`/user/email/${email}`);
  return response.data;
};
