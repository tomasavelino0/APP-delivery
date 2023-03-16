import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
// import OrderDetails from '../components/OrderDetail';
import Navbar from '../components/navBar';
import { getSalesBySellerId } from '../helpers/salesAPI';
import '../style/Seller.css';

export default function SellerPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = user;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sellerApi = async () => {
      const sales = await getSalesBySellerId(`${id}`); // Adicionar de maneira dinâmica posteriormente
      setOrders(sales);
    };
    sellerApi();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div
        className="cardContainer"
      >
        <OrderCard
          orders={ orders }
        />
      </div>
    </div>
  );
}
