const { expect } = require('chai');
const sinon = require('sinon');
const { createProductController, getProductByIdController, getAllProductsController } = require('../../api/controllers/ProductController');
const ProductService = require('../../api/services/ProductService');
const ProductServiceMock = require('../mocks/ProductService');

describe('ProductController', () => {
  describe('Testa se createProductController', () => {
    it('cria um novo produto e retorna-o', async () => {
      const req = {
        body: {
          name: 'Product 1',
          price: 10,
          urlImage: 'http://test.com/image1.jpg'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();

      sinon.replace(ProductService, 'createProduct', ProductServiceMock.createProduct);

      await createProductController(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1, name: 'Product 1', price: 10, urlImage: 'http://test.com/image1.jpg' })).to.be.true;

      sinon.restore();
    });

    it('é capaz de retornar erros ocorridos na criação do produto', async () => {
      const req = {
        body: {
          name: 'Product 1',
          price: 10,
          urlImage: 'http://test.com/image1.jpg'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();

      sinon.replace(ProductService, 'createProduct', sinon.stub().throws(new Error('Erro na criação')));

      await createProductController(req, res, next);

      expect(next.calledWith(new Error('Erro na criação'))).to.be.true;

      sinon.restore();
    });
  });

  describe('Testa se getProductByIdController', () => {
    it('retorna um produto pela Id', async () => {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {
        json: sinon.stub()
      };
      const next = sinon.stub();

      sinon.replace(ProductService, 'getProductById', ProductServiceMock.getProductById);

      await getProductByIdController(req, res, next);

      expect(res.json.calledWith({ id: 1, name: 'Product 1', price: 10, urlImage: 'http://test.com/image1.jpg' })).to.be.true;

      sinon.restore();
    });

    it('é capaz de retornar erros ocorridos na busca do produto', async () => {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {
        json: sinon.stub()
      };
      const next = sinon.stub();

      sinon.replace(ProductService, 'getProductById', sinon.stub().throws(new Error('Database error')));

      await getProductByIdController(req, res, next);

      expect(next.calledWith(new Error('Database error'))).to.be.true;

      sinon.restore();
    });
  });

  describe('Testa se getAllProductsController', () => {
    it('retorna todos os produtos', async () => {
      const req = {};
      const res = {
        json: sinon.stub()
      };
      const next = sinon.stub();
      sinon.replace(ProductService, 'getAllProducts', ProductServiceMock.getAllProducts);

      await getAllProductsController(req, res, next);

      expect(res.json.calledWith([
        { id: 1, name: 'Product 1', price: 10, urlImage: 'http://test.com/image1.jpg' },
        { id: 2, name: 'Product 2', price: 20, urlImage: 'http://test.com/image2.jpg' }
      ])).to.be.true;

      sinon.restore();
    });

    it('é capaz de retornar erros ocorridos na busca do produto', async () => {
      const req = {};
      const res = {
        json: sinon.stub()
      };
      const next = sinon.stub();

      sinon.replace(ProductService, 'getAllProducts', sinon.stub().throws(new Error('Database error')));

      await getAllProductsController(req, res, next);

      expect(next.calledWith(new Error('Database error'))).to.be.true;

      sinon.restore();
    });
  });
});