import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navBar';
import { getSaleByClientId } from '../helpers/salesAPI';
import OrderCard from '../components/orderCustomerCard';
import '../style/customerOrders.css';

function OrdersCustomer() {
  const [orders, setOrders] = useState([]);

  const history = useHistory();

  useMemo(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      const request = async () => {
        const salesUser = await getSaleByClientId(user.id);
        setOrders(salesUser);
      };
      request();
    }
  }, []);

  return (
    <div className="container-customer-order">
      <header>
        <Navbar
          pageType="orders"
        />
      </header>
      <main className="container-cards-orders">
        {orders && orders
          .map(({
            id,
            status,
            saleDate,
            totalPrice,
          }) => (
            <button
              className="orderCustomer-container"
              style={ { cursor: 'pointer' } }
              key={ id }
              type="button"
              onClick={ () => history.push(`/customer/orders/${id}`) }
            >
              <OrderCard
                key={ id }
                id={ id }
                status={ status }
                saleDate={ saleDate }
                totalPrice={ totalPrice }
              />
            </button>
          ))}
      </main>
    </div>
  );
}

export default OrdersCustomer;
