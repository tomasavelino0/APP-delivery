const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/saleRoutes');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/user', userRoutes);
app.use('/products', productsRoutes);
app.use('/sale', salesRoutes);

module.exports = app;
