import axios from 'axios';

const PORT = process.env.PORT || '3001';

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const getSaleById = async (id) => {
  const response = await api.get(`/sale/${id}`);
  return response.data;
};

export const getSaleByClientId = async (id) => {
  const response = await api.get(`/sale/client/${id}`);
  return response.data.sales;
};

export const getSalesBySellerId = async (id) => {
  const response = await api.get(`/sale/seller/${id}`);
  return response.data.sales;
};

export const createSale = async (reqBody, token) => {
  const response = await api.post(
    '/sale',
    reqBody, // Corpo da requisição
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const updateSale = async (id, reqBody) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await api.patch(
    `/sale/${id}`,
    reqBody, // Corpo da requisição
    config,
  );
  return response.data;
};

export const getSales = async (token) => {
  try {
    const response = await api.get('/sales', {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
