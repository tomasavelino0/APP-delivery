import React from 'react';
import { func, shape, arrayOf, number } from 'prop-types';
import CartTableItem from './CheckoutCartTableItem';

const ROUTE = 'customer_checkout';

export default function CartTable({ cart, total, remove }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {cart
          .map((product, index) => (<CartTableItem
            key={ product.id }
            product={ product }
            index={ index }
            remove={ remove }
          />))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <h2 data-testid={ `${ROUTE}__element-order-total-price` }>
              Total:
              {total.toFixed(2).replace('.', ',')}
            </h2>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

CartTable.propTypes = {
  cart: arrayOf(shape()).isRequired,
  total: number.isRequired,
  remove: func.isRequired,
};
