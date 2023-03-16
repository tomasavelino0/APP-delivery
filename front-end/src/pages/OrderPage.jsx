import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetails from '../components/OrderDetail';
import Navbar from '../components/navBar';
import { getSaleById } from '../helpers/salesAPI';

export default function OrderPage() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [orderDetail, setOrderDetail] = useState();
  // const [statusState, setStatusState] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const sellerApi = async () => {
      const sale = await getSaleById(`${id}`);
      // setStatusState(sale.status);
      setOrderDetail(sale);
    };
    sellerApi();
  }, [id]);

  return (
    <div>
      <Navbar />
      {orderDetail && (<OrderDetails
        order={ orderDetail }
        setOrderDetail={ setOrderDetail }
        // statusState={ statusState }
        // setStatusState={ setStatusState }
      />)}
    </div>
  );
}
