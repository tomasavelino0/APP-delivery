import React, { useState } from 'react';
import CartTable from '../components/CheckoutCartTable';
import CheckoutForm from '../components/CheckoutForm';
import NavBar from '../components/navBar';

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

  const removeProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((acc, item) => acc + (+item.quantity * +item.price), 0);
  console.log(total);
  return (
    <>
      <NavBar userName={ user.name } />
      <h3>Finalizar Pedido</h3>
      <CartTable
        cart={ cart }
        total={ total }
        remove={ removeProduct }
      />
      <h3>Detalhes e Endereço para Entrega</h3>
      <CheckoutForm
        cart={ cart }
        total={ total.toFixed(2).toString() }
      />
    </>
  );
}
