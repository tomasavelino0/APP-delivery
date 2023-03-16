import { React, useEffect, useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../helpers/usersAPI';
import { createSale } from '../helpers/salesAPI';

const ROUTE = 'customer_checkout';

export default function CheckoutForm({ cart, total }) {
  const [users, setUsers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [address, setAddres] = useState({ address: '', number: '' });
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  console.log(total);
  const handleChange = ({ target }) => {
    setAddres({
      ...address,
      [target.name]: target.value,
    });
  };

  const handleSelect = ({ target }) => {
    setSellerId(target.value);
  };

  const checkButtonState = () => {
    const check = [
      address.address.length > 0,
      address.number.length > 0,
      cart.length > 0,
    ];
    return !check.every((item) => item === true);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const sale = await createSale({ saleData: {
      totalPrice: total,
      deliveryAddress: address.address,
      deliveryNumber: address.number,
      saleDate: new Date(),
      status: 'Pendente',
      userId: user.id,
      sellerId,
    },
    products: cart }, user.token);
    console.log(user.token);

    history.push(`/customer/orders/${sale.id}`);
  };

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers();
      setUsers(result);
      setSellerId(result.filter((seller) => seller.role === 'seller')[0].id);
    };
    getUsers();
  }, []);

  return (
    <form>
      <label htmlFor="vendedora-input">
        P. Vendedora Responsável:
        <select
          name="name"
          id="0"
          data-testid={ `${ROUTE}__select-seller` }
          onChange={ handleSelect }
        >
          {users.filter((seller) => seller.role === 'seller').map((seller) => (
            <option
              id={ seller.id }
              value={ seller.id }
              key={ seller.id }
            >
              {seller.name}
            </option>))}
        </select>
      </label>
      <label htmlFor="endereco">
        Endereço
        <input
          data-testid={ `${ROUTE}__input-address` }
          type="text"
          name="address"
          placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          value={ address.address }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name-input">
        Número
        <input
          data-testid={ `${ROUTE}__input-address-number` }
          type="text"
          name="number"
          placeholder="198"
          value={ address.number }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid={ `${ROUTE}__button-submit-order` }
        type="submit"
        disabled={ checkButtonState() }
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  cart: arrayOf(shape()).isRequired,
  total: string.isRequired,
};
