import axios from 'axios';

const BASE_URLS = {
  cliente: 'http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:3306',
  producto: 'http://bd-ferremas-productos.crwi4crvnqsy.us-east-1.rds.amazonaws.com:3307',
};

const createApi = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000 
  });
};

const clienteApi = createApi(BASE_URLS.cliente);
const productoApi = createApi(BASE_URLS.producto);
const adminApi = createApi(BASE_URLS.admin);

export const clienteService = {
  register: async (userData) => {
    return await clienteApi.post('/clientes', userData);
  },
  login: async (credentials) => {
    return await clienteApi.post('/clientes/login', credentials);
  }
};

export const productoService = {
  getAllProducts: () => productoApi.get('/productos'),
  getProductById: (id) => productoApi.get(`/productos/${id}`),
  getProductsByCategory: (categoryId) => productoApi.get(`/productos/categoria/${categoryId}`),
  createProduct: (productData) => productoApi.post('/productos', productData),
  updateProduct: (id, productData) => productoApi.put(`/productos/${id}`, productData),
  deleteProduct: (id) => productoApi.delete(`/productos/${id}`)
};



export { clienteApi, productoApi};