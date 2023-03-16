import React from 'react';
import { string, shape, number, func } from 'prop-types';

const ROUTE = 'customer_checkout';
const ELEMENT = 'element-order-table';

export default function CartTableItem({ product, index, remove }) {
  const subtotal = +product.quantity * +product.price;

  return (
    <tr>
      <td
        data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }>
        { product.name }
      </td>
      <td data-testid={ `${ROUTE}__${ELEMENT}-quantity-${index}` }>
        { product.quantity }
      </td>
      <td data-testid={ `${ROUTE}__${ELEMENT}-unit-price-${index}` }>
        { product.price.replace('.', ',') }
      </td>
      <td data-testid={ `${ROUTE}__${ELEMENT}-sub-total-${index}` }>
        {subtotal.toFixed(2).replace('.', ',')}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }
          onClick={ () => remove(product.id) }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
CartTableItem.propTypes = {
  product: shape({
    name: string,
    quantity: number,
    price: string,
  }).isRequired,
  index: number.isRequired,
  remove: func.isRequired,
};
