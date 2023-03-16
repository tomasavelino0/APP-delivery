import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../style/customerOrders.css';
import { statusColor, orderIdHandler } from '../style/orderCustomerCard';

function OrderCustomerCard({ id, status, saleDate, totalPrice }) {
  const validateSaleDate = () => `${moment(saleDate).format('DD/MM/YYYY')}`;

  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <div className="orderCustomer-container">
      <div className="number-order">
        <h2>Pedido</h2>
        <h3
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {orderIdHandler(id)}
        </h3>
      </div>
      <div className="container-status">
        <span
          className="status"
          data-testid={ `customer_orders__element-delivery-status-${id}` }
          style={ { backgroundColor: statusColor(status) } }
        >
          { status }
        </span>
      </div>

      <div
        className="date-price-container container-status-value"
      >
        <span
          className="data"
          style={ { marginBottom: '5px' } }
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {validateSaleDate()}
        </span>
        <span
          className="totalPrice"
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          {`${formatPrice(totalPrice)}`}
        </span>
      </div>

    </div>
  );
}

OrderCustomerCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default OrderCustomerCard;
