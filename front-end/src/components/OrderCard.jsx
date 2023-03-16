import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../style/orderCard.css';

const saleShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
});
export default function SellerCard({
  orders,
  // setOrderDetail,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedYear = year;
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };
  const FOUR = 4;
  const formatOrderId = (orderId) => orderId.toString().padStart(FOUR, '0');
  const history = useHistory();
  // const handleClick = (id) => {
  //   const orderSelected = orders.filter((order) => order.id === id);
  //   setOrderDetail(orderSelected[0]);
  // };
  const renderClassStatus = (status) => {
    switch (status) {
    case 'Entregue':
      return 'entregue';
    case 'Preparando':
      return 'preparando';
    case 'Em Trânsito':
      return 'em-transito';
    default:
      return 'pendente';
    }
  };
  return (
    <div
      className="orderContainer"
    >
      <ul>
        {orders.map((order, index) => (
          <button
            className="orderCardContainer"
            key={ index }
            type="button"
            onClick={ () => history.push(`/seller/orders/${order.id}`) }
          >
            <h2
              className="orderId"
              data-testid={ `seller_orders__element-order-id-${order.id}` }
            >
              Pedido
              <br />
              {formatOrderId(order.id)}
            </h2>
            <div className="rightContainer">
              <div
                className="orderStatusDateTotal"
              >
                <p
                  className={ `${renderClassStatus(order.status)} orderStatus` }
                  data-testid={ `seller_orders__element-delivery-status-${order.id}` }
                >
                  {order.status}
                </p>
                <div className="orderDatePrice">
                  <p
                    className="orderDate"
                    data-testid={ `seller_orders__element-order-date-${order.id}` }
                  >
                    {formatDate(order.saleDate)}
                  </p>
                  <p
                    className="orderPrice"
                    data-testid={ `seller_orders__element-card-price-${order.id}` }
                  >
                    R$
                    {parseInt(order.totalPrice, 10).toFixed(2)}
                  </p>
                </div>
              </div>
              <p
                className="orderAddress"
                data-testid={ `seller_orders__element-card-address-${order.id}` }
              >
                Endereço de Entrega:
                {' '}
                {`${order.deliveryAddress}, ${order.deliveryNumber}`}
              </p>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
}
SellerCard.propTypes = {
  orders: PropTypes.arrayOf(saleShape).isRequired,
  // setOrderDetail: PropTypes.func.isRequired,
};
