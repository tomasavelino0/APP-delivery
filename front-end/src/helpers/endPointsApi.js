import axios from 'axios';

const PORT = process.env.PORT || '3001';

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const requestGetAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductsById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
