const { expect } = require('chai');
const sinon = require('sinon');
const {
  createSaleController,
  getSaleByIdController,
  getSalesByClientIdController,
  getSalesBySellerIdController,
  updateOrderStatusController,
} = require('../../api/controllers/SaleController');
const SaleService = require('../../api/services/SaleService');
const SaleServiceMock = require('../mocks/SaleService');

describe('SaleController', () => {
  describe('createSaleController', () => {
    it('should create a new sale and return it', async () => {
      const saleData = {
        clientId: 1,
        sellerId: 2,
        products: [{ productId: 1, quantity: 2 }],
      };
      const req = { body: saleData };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      sinon.replace(SaleService, 'createSale', SaleServiceMock.createSale);

      await createSaleController(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1, ...saleData, status: 'open' })).to.be.true;

      sinon.restore();
    });

    it('should return a 500 status code with an error message if getSaleById throws an error', async () => {
      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      sinon.replace(SaleService, 'getSaleById', sinon.stub().throws(new Error('Database error')));

      await getSaleByIdController(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: INTERNAL_ERROR })).to.be.true;

      sinon.restore();
    });
  });

  describe('getSalesByClientIdController', () => {
    it('should get all sales by client id and return them', async () => {
      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      sinon.replace(SaleService, 'getSalesByClientId', SaleServiceMock.getSalesByClientId);

      await getSalesByClientIdController(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({
        sales: [
          {
            id: 1,
            clientId: 1,
            sellerId: 2,
            products: [{ productId: 1, quantity: 2 }],
            status: 'open',
          },
          {
            id: 2,
            clientId: 1,
            sellerId: 3,
            products: [{ productId: 2, quantity: 1 }],
            status: 'closed',
          },
        ],
      })).to.be.true;

      sinon.restore();
    });

    it('should return a 500 status code with an error message if getSalesByClientId throws an error', async () => {
      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      sinon.replace(SaleService, 'getSalesBySellerId', sinon.stub().throws(new Error('Database error')));

      await getSalesBySellerIdController(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: INTERNAL_ERROR })).to.be.true;

      sinon.restore();
    });
  });

  describe('updateOrderStatusController', () => {
    it('should update the status of a sale and return a success message', async () => {
      const req = { params: { id: 1 }, body: { status: 'closed' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      sinon.replace(SaleService, 'updateSaleStatus', SaleServiceMock.updateSaleStatus);

      await updateOrderStatusController(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Status atualizado' })).to.be.true;

      sinon.restore();
    });

    it('should return a 500 status code with an error message if updateSaleStatus throws an error', async () => {
      const req = { params: { id: 1 }, body: { status: 'closed' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      sinon.replace(SaleService, 'updateSaleStatus', sinon.stub().throws(new Error('Database error')));

      await updateOrderStatusController(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: INTERNAL_ERROR })).to.be.true;

      sinon.restore();
    });
  });
});