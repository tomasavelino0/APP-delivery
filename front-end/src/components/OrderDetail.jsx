import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { updateSale } from '../helpers/salesAPI';
// import { formatPrice } from '../helpers/formatPrice';
import '../style/orderDetail.css';

export default function OrderDetails({
  order,
  // statusState,
  // setStatusState,
}) {
  const FOUR = 4;
  const [stringTestId, setStringTestId] = useState('');
  const { id, saleDate, status, product, totalPrice } = order;
  const { role } = JSON.parse(localStorage.getItem('user'));
  const [statusState, setStatusState] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedYear = year;
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };

  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const formatOrderId = (orderId) => orderId.toString().padStart(FOUR, '0');

  const handleUpdateSale = async (newStatus) => {
    const request = { status: newStatus };
    await updateSale(id, JSON.stringify(request));
    setStatusState(newStatus);
  };

  const renderClassStatus = (st) => {
    switch (st) {
    case 'Entregue':
      return 'entregue';
    case 'Preparando':
      return 'preparando';
    case 'Em trânsito':
      return 'em-transito';
    default:
      return 'pendente';
    }
  };

  const statusTest = () => {
    if (role !== 'customer') {
      return `${stringTestId}-order-details-label-delivery-status`;
    }
    return `${stringTestId}-order-details-label-delivery-status-${id}`;
  };

  useEffect(() => {
    if (role === 'customer') {
      setStringTestId('customer_order_details__element');
    } else {
      setStringTestId('seller_order_details__element');
    }
  }, [role]);

  useEffect(() => {
    setStatusState(status);
  }, [status]);

  return (
    <div
      className="order-container"
    >
      <div className="upper-menu">
        <h2
          data-testid={ `${stringTestId}-order-details-label-order-id` }
        >
          {`Pedido ${formatOrderId(id)}`}
        </h2>
        <p
          data-testid={ `${stringTestId}-order-details-label-seller-name` }
        >
          {`${order.seller.name}`}
        </p>
        <p
          data-testid={ `${stringTestId}-order-details-label-order-date` }
        >
          {formatDate(saleDate)}
        </p>
        <div className="status-container">
          <p
            className={ `${renderClassStatus(order.status)} orderStatus` }
            seller_order_details__button-preparing-check
            data-testid={ statusTest() }
          >
            {statusState}
          </p>
        </div>
        {role !== 'customer' ? (
          <div
            className="orderBtn"
          >
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => handleUpdateSale('Preparando') }
              disabled={ statusState !== 'Pendente' }
            >
              Preparar pedido
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ () => handleUpdateSale('Em Trânsito') }
              disabled={ statusState !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </div>
        ) : (
          <div
            className="orderBtn"
          >
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ () => handleUpdateSale('Entregue') }
              disabled={ statusState !== 'Em Trânsito' }
            >
              Marcar como entregue
            </button>
          </div>
        )}
      </div>
      <table
        className="tableDetail"
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {product.map((prod, index) => (
            <tr key={ prod.id }>
              <td
                className="table-number"
                data-testid={ `${stringTestId}-order-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="table-name"
                data-testid={ `${stringTestId}-order-table-name-${index}` }
              >
                {prod.name}
              </td>
              <td
                className="table-quantity"
                data-testid={ `${stringTestId}-order-table-quantity-${index}` }
              >
                {prod.SaleProduct.quantity}
              </td>
              <td
                className="table-unitPrice"
                data-testid={ `${stringTestId}-order-table-unit-price-${index}` }
              >
                {formatPrice(prod.price)}
              </td>
              <td
                className="table-subTotal"
                data-testid={ `${stringTestId}-order-table-sub-total-${index}` }
              >
                {formatPrice(
                  parseInt(prod.SaleProduct.quantity, 10) * parseInt(prod.price, 10),
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="total-price"
        data-testid={ `${stringTestId}-order-total-price` }
      >
        {formatPrice(totalPrice)}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    product: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        SaleProduct: PropTypes.objectOf(
          PropTypes.shape({
            quantity: PropTypes.number.isRequired,
            saleId: PropTypes.number.isRequired,
            productId: PropTypes.number.isRequired,
          }),
        ),
      }),
    ).isRequired,
    seller: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};
